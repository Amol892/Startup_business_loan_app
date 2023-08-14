from django.urls import path
from .views import FamilyAPI, EMICalculatorView

urlpatterns = [
    path('emicalci/',EMICalculatorView.as_view(), name='emi_calci'),
    path('family/', FamilyAPI.as_view(), name='api_family'),
]