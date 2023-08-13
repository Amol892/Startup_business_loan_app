from django.shortcuts import render,redirect
from .serializers import EnquiryModelSerializer,EnquirySerializer
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
        
        OTP_staus = request.data.get('OTP')
        print(OTP_staus)
        if OTP_staus==True:
           
            email = request.data.get('email')
            
            #OTP generation
            gen_OTP = random.randint(100000,999999)
            
            #Email structure elements
            Subject='Loan Enquiry confirmation message'
            message = f'Hi, Customer Welcome to TechGrow \n\n Thank you for Loan Enquiry,\n Please verify your email with OTP.\nYour OTP :{gen_OTP}'
            from_email = settings.EMAIL_HOST_USER
            to_email = [email]
            send_mail(Subject,message,from_email,to_email)
            request.session['gen_OTP'] = gen_OTP
            request.session.save()
            return Response(data={'message':'OTP is created, check your email inbox','gen_OTP':gen_OTP})
        
        else:
            
            serializer = EnquiryModelSerializer(data=request.data)
            
            if serializer.is_valid():
                email=serializer.validated_data['email']
                if Enquiry.objects.filter(email=email).exists():
                    return Response(data={'message':'Email id already registered'})
                else:
                    serializer.validated_data['status']='pending'
                    serializer.save()
                    return Response(data={'message':'Loan Enquiry succesfully registered, you can check loan status'},status=status.HTTP_201_CREATED)
            
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)


#Enquiry status check
class EnquiryStatusAPIView(APIView):
    
    def post(self,request):
        serializer = EnquirySerializer(data=request.data)
        if serializer.is_valid():
            email=serializer.validated_data['email']
            print(email)
            if Enquiry.objects.filter(email=email).exists():
                customer = Enquiry.objects.filter(email=email)
                serializer_data=EnquiryModelSerializer(customer,many=True)
                
            else:
                return Response(data={'message':'Invalid Email Id'},status=status.HTTP_400_BAD_REQUEST)
        
        return Response(data=serializer_data.data,status=status.HTTP_200_OK)
            
