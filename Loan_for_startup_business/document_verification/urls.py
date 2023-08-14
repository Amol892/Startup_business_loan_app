from django.urls import path
from .views import ApplicationAPIView

urlpatterns=[

    path('applications/',ApplicationAPIView.as_view())
]