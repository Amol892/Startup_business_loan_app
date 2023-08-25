from rest_framework.urls import path
from .views import *


urlpatterns = [
    path('createapplication/',ApplicationAPIView.as_view())
]
