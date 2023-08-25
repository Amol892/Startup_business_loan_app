from rest_framework.urls import path 
from .views import *


urlpatterns = [
    path('documentstatus/<int:pk>/',DocumentVerifyAPIVIew.as_view())
]
