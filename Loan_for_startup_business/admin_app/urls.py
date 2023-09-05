from django.conf import settings
from rest_framework.urls import path
from .views import *
from django.conf.urls.static import static

urlpatterns = [
    path('signup/',RegisterAPIView.as_view()),
    path('loginpage/',LoginAPIView.as_view()),
    path('emicalci/',EMICalculatorAPIView.as_view()),
    
    #user ids list fetching endpoints for API
    path('a_user_ids/', AppllicationUserIDsAPIView.as_view()),
    path('f_user_ids/', FamilyUserIDsAPIView.as_view()),
    path('b_user_ids/',BankUserIDsAPIView.as_view()),
    
    path('family/', FamilyAPIView.as_view()),
    path('bank/',BankAPIView.as_view()),
    
    #Admin dashboard 
    path('allapplications/',AllApplicationAPIView.as_view()),
    
    #Quaterly Loan data
    path('mqareport/',MQYReportAPIView.as_view()),
    
    #Defaulter
    
    path('defaulters/', DefaulterList.as_view()),
    path('checkdefaulter/<int:pk>/',CheckDefaulterAPIView.as_view())
    
]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)