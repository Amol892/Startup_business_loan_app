from datetime import timedelta, timezone
from django.shortcuts import get_object_or_404
from .serializer import FamilySerializer, EMICalculatorSerializer, ApplicationSerializer, DefaulterSerializer
from .models import Family, User
from loan_sanctioning.models import Loan
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from disburstment.models import Installment, Defaulter
from application_generation.models import Application
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
    def get(self, request, id, *args, **kwargs):
        application = Application.objects.get(id=id)
        serializer = ApplicationSerializer(application)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

# class MarkAsDefaulterView(APIView):
#     def post(self, request, id, *args, **kwargs):
#         application = Application.objects.get(id=id)
#         loan = get_object_or_404(Loan, application=application)
#         today = timezone.now().date()
#         last_installment = Installment.objects.filter(
#             loan=loan,
#             status__in=['ok', 'late'], 
#             installment_expected_date__lte=today,
#             installment_expected_date__gte=today - timedelta(days=90) 
#         ).order_by('-installment_expected_date').first() 
        
#         if last_installment:
#             default_amount = last_installment.remaining_amount
#             next_expected_date = Installment.objects.filter(
#                 loan=loan,
#                 installment_expected_date__gt=last_installment.installment_expected_date
#             ).order_by('installment_expected_date').first()
#             pending_since_date = next_expected_date.installment_expected_date if next_expected_date else today
#         else:
#             default_amount = loan.loan_principal_amount
#             pending_since_date = today
        
#         defaulter, created = Defaulter.objects.get_or_create(user=application.user)
#         defaulter.default_amount = default_amount
#         defaulter.pending_since_date = pending_since_date
#         defaulter.save()
    
#         return Response({'message': 'User added to defaulter list'}, status=status.HTTP_200_OK)
class MarkAsDefaulterView(APIView):
    def post(self, request, id, *args, **kwargs):
        application = Application.objects.get(id=id)
        loan = get_object_or_404(Loan, application=application)
        today = timezone.now().date()
        three_months_ago = today - timedelta(days=90)

        # Get all installments within the last 3 months
        installments = Installment.objects.filter(
            loan=loan,
            installment_expected_date__lte=today,
            installment_expected_date__gte=three_months_ago
        ).order_by('installment_expected_date')

        consecutive_pending_count = 0
        last_pending_date = None
        last_remaining_amount = None

        for installment in installments:
            print(f"Installment Date: {installment.installment_expected_date}, Status: {installment.status}")
            if installment.status == 'pending':
                consecutive_pending_count += 1
                if consecutive_pending_count == 1:
                    last_pending_date = installment.installment_expected_date
                    last_remaining_amount = installment.remaining_amount
                if consecutive_pending_count == 3:
                    break
            else:
                consecutive_pending_count = 0

        print(f"consecutive_pending_count: {consecutive_pending_count}")
        if consecutive_pending_count == 3:
            # The applicant hasn't paid for consecutive 3 months with "pending" status
            defaulter, created = Defaulter.objects.get_or_create(user=application.user)
            defaulter.default_amount = last_remaining_amount
            defaulter.pending_since_date = last_pending_date
            defaulter.save()

            return Response({'message': 'User added to defaulter list'}, status=status.HTTP_200_OK)
        else:
            # Applicant doesn't meet the criteria, do nothing
            return Response({'message': 'User does not meet defaulter criteria'}, status=status.HTTP_200_OK)

class DefaulterList(APIView):
    def get(self, request, format=None):
        defaulters = Defaulter.objects.all()
        serializer = DefaulterSerializer(defaulters, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)



