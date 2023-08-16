from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import token_obtain_pair,TokenObtainPairView
from .models import *
from .utiles import detectUser
from application_generation.models import Application
from application_generation.serializers import ApplicationModelSerializer
#User registeration view
class RegisterAPIView(APIView):
       
    def post(self,request):
        serializer=RegisterModelSerializer(data=request.data)
        print(request.data.get('role'))
        if serializer.is_valid():
            
            serializer.save()
            
            return Response(data={'message':'Your account is created and check mail for account activation link'},status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    



class LoginAPIView(TokenObtainPairView):
    
    def post(self,request):
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                email = serializer.validated_data['email']
                user = User.objects.get(email=email)
                
                response = super().post(request)
                if response.status_code == status.HTTP_200_OK:
                    
                    redirectURL = detectUser(user)
                    
                    url_data = {'redirectURL':redirectURL,'email':email}
                    response.data.update(url_data)
                    return Response(data=response.data)
            return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
#API for family model to show not updated user ids      
class FamilyUserIDsAPIView(APIView):
    def get(self, request):
        user_ids = Application.objects.values_list('user_id', flat=True)
        family_user_ids = Family.objects.values_list('user_id', flat=True)
        remaining_user_ids = user_ids.exclude(id__in=family_user_ids.values_list('user_id', flat=True))
        return Response(remaining_user_ids)

#API for Bank model to show not updated user ids           
class BankUserIDsAPIView(APIView):
    def get(self, request):
        user_ids = Application.objects.values_list('user_id', flat=True)
        bank_user_ids = Bank.objects.values_list('user_id', flat=True)
        remaining_user_ids = user_ids.exclude(id__in=bank_user_ids.values_list('user_id', flat=True))
        return Response(remaining_user_ids)
    
#Family model API
class FamilyAPIView(APIView):
    def get(self, request):
        families = Family.objects.all()
        serializer=FamilyModelSerializer(families, many=True)
        return Response(data=serializer.data , status=status.HTTP_200_OK)
    
    def post(self ,request):
        serializer=FamilyModelSerializer(data=request.data)
        if serializer.is_valid():
            
            serializer.save()
            return Response(data=serializer.data,  status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

#Bank model API   
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
    
#EMI Calculator API
class EMICalculatorAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = EMICalculatorSerializer(data=request.data)
        if serializer.is_valid():
            principal = serializer.validated_data['principal']
            interest_rate = serializer.validated_data['interest_rate']
            tenure_years = serializer.validated_data['tenure_years']
            
            tenure_months = tenure_years * 12
            monthly_interest_rate = interest_rate / (12 * 100)
            emi = (principal * monthly_interest_rate * (1 + monthly_interest_rate)**tenure_months) / ((1 + monthly_interest_rate)**tenure_months - 1)
            
            total_payment = emi * tenure_months
            total_interest = total_payment - principal
            data={
                "Monthly Payment" :f'Rs {int(emi)}',
                "Total Interest":f'Rs {int(total_interest)}',
                'Total Paymable Amount':f'Rs {int(total_payment)}',
            }

            return Response(data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
#Fetching All application data API
class AllApplicationAPIView(APIView):
    def post(self,request):
        application_status = request.data['status']
        print(application_status)
        if application_status=='all':
            application=Application.objects.select_related('user')
            
            serializer=ApplicationModelSerializer(application,many=True)
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        else:
            application=Application.objects.select_related('user').filter(status=application_status)
            print(application_status)
            serializer=ApplicationModelSerializer(application,many=True)
            return Response(data=serializer.data,status=status.HTTP_200_OK)

        return Response(data=serializer.error,status=status.HTTP_400_BAD_REQUEST)
    
