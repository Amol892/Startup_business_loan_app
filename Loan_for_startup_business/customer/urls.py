from rest_framework.urls import path 
from .views import EnquiryAPIView,OTPVerifyAPIView,EnquiryStatusAPIView


urlpatterns = [
    path('enquiry/',EnquiryAPIView.as_view(),name='enquiry'),
    path('otp/',OTPVerifyAPIView.as_view(),name='otp_verify'),
    path('enquiry_status/',EnquiryStatusAPIView.as_view(),name='enquiry_status')
]
