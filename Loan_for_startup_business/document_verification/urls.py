from django.urls import path
from .views import ApplicationAPIView,DocumentAPIView


urlpatterns=[

    path('applications/',ApplicationAPIView.as_view()),
    path('documents/<int:pk>/',DocumentAPIView.as_view())
]