from django.shortcuts import render,redirect
from .serializers import EnquiryModelSerializer,OTPSerializer
from .models import Enquiry
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import random
from django.core.mail import send_mail
# Create your views here.

class EnquiryAPIView(APIView):
    
    def get(self,request):
        enquiry = Enquiry.objects.all()
        serializer = EnquiryModelSerializer(enquiry,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    
    def post(self,request):
        serializer = EnquiryModelSerializer(data=request.data)
        if serializer.is_valid():
            
            first_name = serializer.validated_data['first_name']
            last_name = serializer.validated_data['last_name']
            phone_number = serializer.validated_data['mobile']
            email = serializer.validated_data['email']
            
            #OTP generation
            OTP = random.randint(100000,999999)
            # Store the OTP in the session
            request.session['OTP'] = OTP
            
            #Email structure elements
            Subject='Loan Enquiry confirmation message'
            message = f'Hi {first_name} {last_name} \n\n Thank you for Loan Enquiry,\n Please verify your email with OTP.\nYour OTP :{OTP}'
            from_email = settings.EMAIL_HOST_USER
            to_email = [email]
            send_mail(Subject,message,from_email,to_email)
            
            serializer.validated_data['status']='pending'
            serializer.save()
            
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)


  
class OTPVerifyAPIView(APIView):
    
    def post(self,request):
        
        serializer = OTPSerializer(data=request.data)
        if serializer.is_valid():
            Rev_OTP = serializer.validated_data['OTP']
            
            try:
                # Retrieve the stored OTP from the session
                stored_otp = request.session['OTP']
            except KeyError:
                return Response(data={'message': 'OTP not available'})
            
            #OTP verification
            if stored_otp == int(Rev_OTP):
                return Response(data={'OTP successfully verified'})
            else:
                return Response(data={'Please Enter correct OTP'})
            
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
#Enquiry status check
class EnquiryStatusAPIView(APIView):
    
    def get(self,request):
        email=request.POST.get('email')
        if Enquiry.objects.filter(email=email).exists():
            customer = Enquiry.objects.filter(email=email)
        else:
            return Response(data={'message':'Invalid Email Id'},status=status.HTTP_400_BAD_REQUEST)
        
        serializer = EnquiryModelSerializer(customer,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
            
