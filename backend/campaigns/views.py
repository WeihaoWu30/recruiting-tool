from rest_framework.viewsets import ModelViewSet
from .models import Campaign
from .serializers import CampaignSerializer
# Create your views here.

class CampaignViewSet(ModelViewSet):
   queryset = Campaign.objects.all()
   serializer_class = CampaignSerializer
