from rest_framework.urls import path 
from .views import *


urlpatterns = [
    path('installment/<int:pk>/',InstallmentAPIView.as_view()),
    path('information/<int:pk>/',InformationAPIView.as_view()),
    path('payloanamount/', PayLoanAmountAPIView.as_view()),
    path('paymentsuccess/',HandlePaymentSuccess.as_view())
]
