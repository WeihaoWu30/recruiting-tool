from rest_framework.routers import DefaultRouter
from .views import CandidateViewSet

router = DefaultRouter()
router.register(r'candidates', CandidateViewSet)

urlpatterns = router.urls