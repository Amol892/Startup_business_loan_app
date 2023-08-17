from django.shortcuts import render
from .serializer import FamilySerializer, EMICalculatorSerializer, ApplicationSerializer,InstallmentSerializer, UserSerializer,LoanSerializer
from .models import Family, User
from loan_sanctioning.models import Loan
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
#from django.shortcuts import get_object_or_404
from disburstment.models import Installment, Defaulter
from application_generation.models import Application
from datetime import timedelta
from django.utils import timezone

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
    
class ApplicationInstallmentView(APIView):
    # def get(self, request, *args, **kwargs):
    #     applications = Loan.objects.filter(status='done')
    #     #applic = Installment.objects.select_related("loan").filter(loan.application.id)
    #     applicant = [loan.application for loan in applications]
    #     serializer = ApplicationSerializer(applicant, many=True)
    #     return Response(data=serializer.data, status=status.HTTP_200_OK)
#    def get(self, request):
#         users_with_applicants = User.objects.filter(Applications__isnull=False).distinct()
        
#         serializer = UserSerializer(users_with_applicants, many=True)
#         return Response(serializer.data)
    # def get(self, request, *args, **kwargs):
    #     applications_with_done_loans = Application.objects.filter(Loans__status='done')
    #     serialized_data = []
        
    #     for Applications in applications_with_done_loans:
    #         application_data = {
    #             'Applications': ApplicationSerializer(Applications).data,
    #             'Loans': [],
    #         }
            
    #         for Loans in Applications.Loans.all():
    #             loan_data = {
    #                 'Loans': LoanSerializer(Loans).data,
    #                 'installments': [],
    #             }
                
    #             for installment in Loans.installments.all():
    #                 installment_data = InstallmentSerializer(installment).data
    #                 loan_data['installments'].append(installment_data)
                
    #             application_data['Loans'].append(loan_data)
            
    #         serialized_data.append(application_data)
        
    #     return Response(data=serialized_data, status=status.HTTP_200_OK)
    def get(self, request, id, *args, **kwargs):
        application = Application.objects.get(id=id)
        serializer = ApplicationSerializer(application)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

class MarkAsDefaulterView(APIView):
    def post(self, request, id, *args, **kwargs):
        try:
            application = Application.objects.get(id=id)
        except Application.DoesNotExist:
            return Response(data={"message": "Application not found."}, status=status.HTTP_404_NOT_FOUND)
        
        if application.loans.status == 'pending':
            three_months_ago = timezone.now() - timedelta(days=90)
            overdue_installments = application.loans.installments.filter(
                installment_expected_date__gte=three_months_ago,
                status__in=['pending', 'defaulted']
            )
            
            if overdue_installments.exists():
                try:
                    defaulter = Defaulter.objects.get(user=application.user)
                except Defaulter.DoesNotExist:
                    defaulter = Defaulter(user=application.user)
                
                defaulter.default_amount += application.loans.total_amount_and_processing_fees
                defaulter.pending_since_date = application.loans.maturity_date
                defaulter.save()
                
                return Response(data={"message": "Applicant marked as defaulter."}, status=status.HTTP_200_OK)
            else:
                return Response(data={"message": "Applicant not eligible for defaulter status."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(data={"message": "Application not eligible for defaulter status."}, status=status.HTTP_400_BAD_REQUEST)