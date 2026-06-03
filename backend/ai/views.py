from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from candidates.models import Candidate
from campaigns.models import Campaign
from google import genai
import os

# Create your views here.

class AiAPIView(APIView):
   def post(self, request, format=None):
      candidate_name = request.data.get('name')
      candidate_url = request.data.get('linkedin_url')
      candidate_skills = request.data.get('skills')
      candidate_headline = request.data.get('headline')
      candidate_location = request.data.get('location')
      candidate_match_score = request.data.get('match_score')
      candidate_roles = request.data.get('roles', [])
      campaign_id = request.data.get('campaign_id')

      try:
         campaign = Campaign.objects.get(id=campaign_id)
      except Campaign.DoesNotExist:
         return Response({'error': 'Campaign not found'}, status=status.HTTP_404_NOT_FOUND)
      
      existing_candidate = Candidate.objects.filter(linkedin_url=candidate_url).first()
      if existing_candidate:
         if not existing_candidate.roles.filter(id__in=candidate_roles).exists():
            existing_candidate.roles.add(*candidate_roles)
      else:
         candidate = Candidate.objects.create(
            name=candidate_name,
            headline=candidate_headline,
            location=candidate_location,
            linkedin_url=candidate_url,
            skills=candidate_skills,
            match_score=candidate_match_score,
            status='Contacted'
         )

         candidate.roles.set(candidate_roles)

      candidate = existing_candidate if existing_candidate else candidate

      prompt = f"""You are a professional HR recruiter at a bank or credit union writing a personalized LinkedIn outreach message.

         Your goal is to recruit the following person for the role of {campaign.role}:
         - Name: {candidate_name}
         - Current headline: {candidate_headline}
         - Location: {candidate_location}
         - Skills: {', '.join(candidate_skills) if candidate_skills else 'Not provided'}

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
         - Tone must be {campaign.message_tone.lower()}
      """
      client = genai.Client(api_key=os.getenv('GOOGLE_API_KEY'))
      response = client.models.generate_content(
         model = 'gemini-2.5-flash',
         contents = prompt
      )
      message = response.text
      candidate.outreach_message = message
      candidate.save(update_fields=['outreach_message'])

      return Response({'message': message}, status=status.HTTP_200_OK)

