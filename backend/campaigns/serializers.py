from rest_framework import serializers
from .models import Campaign

class CampaignSerializer(serializers.ModelSerializer):
   class Meta:
      model = Campaign
      fields = ['id', 'role', 'target_skills', 'target_location', 'experience_min', 'message_tone', 'updated_at']
