from django.urls import path
from .views import UserAPIView

urlpatterns=[

    path('user1/',UserAPIView.as_view())
]