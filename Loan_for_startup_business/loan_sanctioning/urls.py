from django.urls import path
from .views import LoanEMICalculator

urlpatterns = [
    path('emicalci/',LoanEMICalculator.as_view(), name='emi_calci')
]