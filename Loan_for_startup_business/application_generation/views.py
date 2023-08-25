from django.shortcuts import render
from .serializers import *
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from django.core.mail import send_mail
# Create your views here.

class ApplicationAPIView(APIView):
    
    def post(self,request):
        
        serializer = ApplicationModelSerializer(data=request.data)
        
        if serializer.is_valid():
            email = serializer.validated_data['user']
            
            print(email)
            Subject='Loan Enquiry confirmation message'
            message = f'Hi, Customer Welcome to TechGrow \n\n Thank you for Loan Enquiry,\n your loan application is created successfully please check your status'
            from_email = settings.EMAIL_HOST_USER
            to_email = [email]
            send_mail(Subject,message,from_email,to_email)
            
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED )
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
       