from django.shortcuts import render
from .serializers import UserModelSerializer, FamilyModelSerializer, BankModelSerializer
from rest_framework.viewsets import ModelViewSet
from .models import User, Family, Bank
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated

class UserView(ModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()

class FamilyView(ModelViewSet):
    serializer_class = FamilyModelSerializer
    queryset = Family.objects.all()

class BankView(ModelViewSet):
    serializer_class = BankModelSerializer
    queryset = Bank.objects.all()

