from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from candidates.models import Candidate
from campaigns.models import Campaign
from google import genai
from google.genai import types
import os
import json


class AiAPIView(APIView):
   def post(self, request, format=None):
      profile_text = request.data.get('profileText')
      candidate_url = request.data.get('linkedin_url')
      role_id = request.data.get('role')
      campaign_id = request.data.get('campaign_id')

      if not profile_text:
         return Response({'error': 'profileText is required'}, status=status.HTTP_400_BAD_REQUEST)

      try:
         campaign = Campaign.objects.get(id=campaign_id)
      except Campaign.DoesNotExist:
         return Response({'error': 'Campaign not found'}, status=status.HTTP_404_NOT_FOUND)

      client = genai.Client(api_key=os.getenv('GOOGLE_API_KEY'))

      # ---- Step 1: extract structured fields + score the match ----
      extract_prompt = f"""You are analyzing a LinkedIn profile for a bank/credit union recruiter.

Here is the raw text scraped from the candidate's profile:
\"\"\"
{profile_text}
\"\"\"

The recruiter is hiring for: {campaign.role}
Target skills: {', '.join(campaign.target_skills) if campaign.target_skills else 'Not specified'}
Target location: {campaign.target_location}
Experience required: {campaign.experience_min}

Extract the candidate's details and score how well they match the criteria above.
Return ONLY valid JSON in exactly this shape:
{{
  "name": "their full name",
  "headline": "their current headline/title",
  "location": "their location",
  "skills": ["skill1", "skill2"],
  "experiences": [
    {{"title": "job title", "company": "company name", "duration": "e.g. 2020 - Present"}}
  ],
  "match_score": 0
}}
match_score is an integer from 0 to 100 reflecting how well they fit the role and criteria.
For experiences, list each past/current role you can find; use empty strings for any field you can't determine."""

      extract_response = client.models.generate_content(
         model='gemini-2.5-flash',
         contents=extract_prompt,
         config=types.GenerateContentConfig(response_mime_type='application/json'),
      )

      try:
         data = json.loads(extract_response.text)
      except json.JSONDecodeError:
         return Response({'error': 'Could not parse profile'}, status=status.HTTP_502_BAD_GATEWAY)

      candidate_name = data.get('name', '')
      candidate_headline = data.get('headline', '')
      candidate_location = data.get('location', '')
      candidate_skills = data.get('skills', [])
      candidate_experiences = data.get('experiences', [])
      candidate_match_score = data.get('match_score', 0)

      # ---- Step 2: find or create the candidate ----
      existing_candidate = Candidate.objects.filter(linkedin_url=candidate_url).first()
      if existing_candidate:
         if not existing_candidate.roles.filter(id=role_id).exists():
            existing_candidate.roles.add(role_id)
         candidate = existing_candidate
      else:
         candidate = Candidate.objects.create(
            name=candidate_name,
            headline=candidate_headline,
            location=candidate_location,
            linkedin_url=candidate_url,
            skills=candidate_skills,
            experiences=candidate_experiences,
            match_score=candidate_match_score,
            status='Contacted',
         )
         candidate.roles.add(role_id)

      # ---- Step 3: generate the outreach message ----
      message_prompt = f"""You are a professional HR recruiter at a bank or credit union writing a personalized LinkedIn outreach message.

Your goal is to recruit the following person for the role of {campaign.role}:
- Name: {candidate_name}
- Current headline: {candidate_headline}
- Location: {candidate_location}
- Skills: {', '.join(candidate_skills) if candidate_skills else 'Not provided'}
- Experience: {'; '.join(f"{e.get('title', '')} at {e.get('company', '')}" for e in candidate_experiences) if candidate_experiences else 'Not provided'}

Campaign targeting criteria:
- Target skills: {', '.join(campaign.target_skills) if campaign.target_skills else 'Not specified'}
- Target location: {campaign.target_location}
- Experience required: {campaign.experience_min}
- Message tone: {campaign.message_tone}

Rules you MUST follow:
- Write ONLY the message itself — no subject line, no explanation, no commentary
- Address the person by their first name only
- Keep it under 150 words
- Be specific — reference their actual skills and headline, not generic praise
- Sound human and natural, not like a template
- Do NOT use phrases like "I came across your profile" or "I hope this message finds you well"
- End with a clear but low-pressure call to action (e.g. open to a quick chat?)
- Tone must be {campaign.message_tone.lower()}"""

      message_response = client.models.generate_content(
         model='gemini-2.5-flash',
         contents=message_prompt,
      )
      message = message_response.text

      candidate.outreach_message = message
      candidate.save(update_fields=['outreach_message'])

      return Response({
         'message': message,
         'candidate': {
            'name': candidate_name,
            'headline': candidate_headline,
            'location': candidate_location,
            'skills': candidate_skills,
            'experiences': candidate_experiences,
            'match_score': candidate_match_score,
         },
      }, status=status.HTTP_200_OK)