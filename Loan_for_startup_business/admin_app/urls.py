from rest_framework.urls import path
from .views import *

urlpatterns = [
    path('signup/',RegisterAPIView.as_view()),
    path('loginpage/',LoginAPIView.as_view()),
    path('emicalci/',EMICalculatorAPIView.as_view()),
    
    #user ids list fetching endpoints for API
    path('f_user_ids/', FamilyUserIDsAPIView.as_view()),
    path('b_user_ids/',BankUserIDsAPIView.as_view()),
    
    path('family/', FamilyAPIView.as_view()),
    path('bank/',BankAPIView.as_view()),
    
    #Admin dashboard 
    path('allapplications/',AllApplicationAPIView.as_view())
    
]
