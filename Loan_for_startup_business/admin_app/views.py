from django.shortcuts import render
from .serializers import UserModelSerializer, FamilyModelSerializer, BankModelSerializer
from rest_framework.viewsets import ModelViewSet
from .models import User, Family, Bank
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

class UserView(ModelViewSet):
    serializer_class = UserModelSerializer
    queryset = User.objects.all()


'''
class UserAPI(APIView):

    def get(self, request, pk):
        obj = get_object_or_404(pk=pk)
        serializer = UserModelSerializer
        return Response(data=serializer.data)
    
    def post(self, request):
        serializer = UserModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer=serializer.data)
        return Response(data=serializer.errors)
'''
        
    
class FamilyView(ModelViewSet):
    serializer_class = FamilyModelSerializer
    queryset = Family.objects.all()

class BankView(ModelViewSet):
    serializer_class = BankModelSerializer
    queryset = Bank.objects.all()

class BankDetails(APIView):
    def get(self,request,pk):
        obj = get_object_or_404(Bank, user=pk)
        serializers = BankModelSerializer(obj)
        return Response(data=serializers.data)

