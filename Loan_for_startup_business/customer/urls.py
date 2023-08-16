from rest_framework.urls import path 
from .views import EnquiryAPIView,EnquiryStatusAPIView,CustomerLoanAPIView


urlpatterns = [
    path('enquiry/',EnquiryAPIView.as_view(),name='enquiry'),
    path('enquiry_status/',EnquiryStatusAPIView.as_view(),name='enquiry_status'),
    path('loandata/<str:email>/',CustomerLoanAPIView.as_view())
]
