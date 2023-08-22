from rest_framework.urls import path 
from .views import *


urlpatterns = [
    path('enquiry/',EnquiryAPIView.as_view(),name='enquiry'),
    path('enquiry_status/',EnquiryStatusAPIView.as_view(),name='enquiry_status'),
    path('loandata/<str:email>/',CustomerLoanAPIView.as_view()),
    path('installmentdata/<str:email>/',CustomerInstallmentAPIView.as_view()),
    path('EMIPayment/<str:email>/',EMIPaymentAPIView.as_view()),
    path('pay/', PayAPIView.as_view()),
    path('paymentsuccess/',HandlePaymentSuccess.as_view())
]
