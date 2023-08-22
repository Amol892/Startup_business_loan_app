from rest_framework.urls import path 
from .views import *
urlpatterns = [
    path('documents/<int:pk>/',DocumentVerifyAPIVIew.as_view())
]
