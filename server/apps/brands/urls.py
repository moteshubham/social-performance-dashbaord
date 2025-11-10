from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BrandViewSet, fetch_metrics_by_handle

router = DefaultRouter()
router.register(r'brands', BrandViewSet, basename='brands')

urlpatterns = [
    path('', include(router.urls)),
    path('fetch-metrics/<str:handle>/', fetch_metrics_by_handle, name='fetch-metrics'),
]
