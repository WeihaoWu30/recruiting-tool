from rest_framework.viewsets import ModelViewSet
from .models import Candidate
from .serializers import CandidateSerializer
# Create your views here.

class CandidateViewSet(ModelViewSet):
   queryset = Candidate.objects.all()
   serializer_class = CandidateSerializer
