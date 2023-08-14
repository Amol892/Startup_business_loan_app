from django.shortcuts import render
from .serializer import FamilySerializer, EMICalculatorSerializer
from .models import Family
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
#from django.shortcuts import get_object_or_404

# Create your views here.
class FamilyAPI(APIView):
    def get(self, request):
        families = Family.objects.all()
        serializer=FamilySerializer(families, many=True)
        return Response(data=serializer.data , status=status.HTTP_200_OK)
    
    def post(self ,request):
        serializer=FamilySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,  status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class EMICalculatorView(APIView):
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