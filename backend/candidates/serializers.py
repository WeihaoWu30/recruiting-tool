from rest_framework import serializers
from .models import Candidate
from roles.models import Role

class CandidateSerializer(serializers.ModelSerializer):
   roles = serializers.PrimaryKeyRelatedField(
      many=True,
      queryset=Role.objects.all()
   )
   class Meta:
      model = Candidate
      fields = ['id', 'name', 'headline', 'location', 'linkedin_url', 'skills', 'match_score', 'outreach_message', 'status', 'roles', 'created_at']