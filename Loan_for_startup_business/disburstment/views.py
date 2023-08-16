from django.shortcuts import get_object_or_404, render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from loan_sanctioning.models import Loan
from application_generation.models import Application
from application_generation.serializers import ApplicationModelSerializer
# Create your views here.

class InstallmentAPIView(APIView):
    
    def get(self,request,pk=None):
        loan_obj = get_object_or_404(Loan,application=pk)
        loan_id = loan_obj.id
        Installment_obj = Installment.objects.filter(loan=loan_id)
        serializer = InstallmentModelserializer(Installment_obj,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)