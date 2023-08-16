from rest_framework.urls import path 
from .views import *


urlpatterns = [
    path('installment/<int:pk>/',InstallmentAPIView.as_view())
]
