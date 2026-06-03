from django.urls import path
from .views import AiAPIView

urlpatterns = [
   path('generate-message/', AiAPIView.as_view()),
]