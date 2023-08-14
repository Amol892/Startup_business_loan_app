from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Application, Guarantor, Document
from .serializers import AppplicationModelSerializer, GurantorModelSerializer, DocumentModelSerializer
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404


# Create your views here.

class ApplicationAPI(APIView):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(Self, request):
        obj = Application.objects.all()
        serializer = AppplicationModelSerializer(obj, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = AppplicationModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ApplicationDetailsAPI(APIView):
    def get(self,request,pk):
        obj = get_object_or_404(Application,pk=pk)
        serializer =AppplicationModelSerializer(obj)
        return Response(data=serializer.data)
    
    def patch(self,request,pk):
        obj = get_object_or_404(Application,pk=pk)
        serializer = AppplicationModelSerializer(data=request.data, instance=obj, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data )
        return Response(data=serializer.errors)

    
    
    

    
        
class GuarantorAPI(APIView):
    #authentication_classes = [JWTAuthentication]
    #permission_classes = [IsAuthenticated]

    def get(self, request):
        obj = Guarantor.objects.all()
        serializer = GurantorModelSerializer(obj, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = GurantorModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors)
    
class DocumentAPI(APIView):
    def get(self, request):
        obj = Document.objects.all()
        serializer = DocumentModelSerializer(obj, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request):
        serializer = DocumentModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data, status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors)

class DocumentDetailsAPI(APIView):

    def get(self,request,pk):
        obj = get_object_or_404(Application,pk=pk)
        serializer =AppplicationModelSerializer(instance=obj) 
        return Response(data=serializer.data)
    
    
from django.core.mail import send_mail
from django.http import HttpResponse 


class ApplicationRegrdingMail(APIView):
    def get(self, request):
        pass
    def post(self, request):
        print("hii")
        office_mail = "loanforstartupsinc@gmail.com"
        customer_name = request.data["name"]
        customer_email = request.data["email"]
        message = request.data["message"]
        print(customer_name, customer_email, message)
        subject = f"Hi {customer_name} This is LoannApplication Regarding Mail"
        send_mail(f"{customer_name} This is LoannApplication Regarding Mail", message, office_mail, [f"{customer_email}"], fail_silently=False)
        print("email send ok")
        return Response(data={"message":"send email"})
