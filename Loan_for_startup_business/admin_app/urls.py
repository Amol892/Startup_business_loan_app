from django.urls import path
from .views import BankAPIView,FetchData

urlpatterns=[
    path('bank/',BankAPIView.as_view(),name='bank_url'),
    path('fetch/',FetchData.as_view(),name='fetch_url')
]