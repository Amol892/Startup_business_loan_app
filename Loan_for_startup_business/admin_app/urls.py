from rest_framework.urls import path
from .views import RegisterAPIView,LoginAPIView

urlpatterns = [
    path('signup/',RegisterAPIView.as_view()),
    path('loginpage/',LoginAPIView.as_view())
]
