from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import BankModelSerializer, LoanstatusSerializer
from .models import Bank
from rest_framework.response import Response
from rest_framework import status
from application_generation.models import Application
from application_generation.serializers import ApplicationModelSerializer


class BankAPIView(APIView):
    def get(self,request):
        bank=Bank.objects.all()
        serializer=BankModelSerializer(bank,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer=BankModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class FetchData(APIView):
    def post(self,request):
        
        S1 = request.data['status']
        print(S1)
        if S1=='all':
            application=Application.objects.all()
        else:
            
        
            application=Application.objects.all().filter(status=S1)
            print(S1)
        
        serializer=ApplicationModelSerializer(application,many=True)

        return Response(data=serializer.data,status=status.HTTP_200_OK)




