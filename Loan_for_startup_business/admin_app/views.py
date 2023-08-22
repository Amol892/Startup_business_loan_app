
from django.shortcuts import get_object_or_404, render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import token_obtain_pair,TokenObtainPairView
from .models import *
from .utiles import detectUser
from application_generation.models import Application
from application_generation.serializers import ApplicationModelSerializer
from datetime import timezone,timedelta
from django.db.models import Sum,Count
from disburstment.models import Defaulter
from datetime import datetime,timedelta, timezone
#User registeration view
class RegisterAPIView(APIView):
       
    def post(self,request):
        serializer=RegisterModelSerializer(data=request.data)
        print(request.data.get('role'))
        if serializer.is_valid():
            
            serializer.save()
            
            return Response(data={'message':'Your account is created and check mail for account activation link'},status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    


# Login API
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
            application_id_list = [i[0] for i in list(Application.objects.filter(status=application_status).values_list('id'))]
            #loan_id_list = list(map(lambda x : Loan.objects.get(application=x).id, application_id_list))
            #disbursement_date_list = 
            #print(loan_id_list)
            serializer=ApplicationModelSerializer(application,many=True)
            
            return Response(data=serializer.data,status=status.HTTP_200_OK)

        return Response(data=serializer.error,status=status.HTTP_400_BAD_REQUEST)
    


class MQYReportAPIView(APIView):
    
    #Quaterly sanctioning loan amount
    def get(self,request):
        
        Quaters = ['Q1','Q2','Q3','Q4']
        
        #Quaterly loan sanctioning amount
        Q1_A = Loan.objects.filter(response_timestamp__range=('2023-04-01 00:00:00.000000','2023-06-30 23:59:59.999999')).aggregate(Sum('loan_principal_amount'))
        Q2_A = Loan.objects.filter(response_timestamp__range=('2023-07-01 00:00:00.000000','2023-09-30 23:59:59.999999')).aggregate(Sum('loan_principal_amount'))
        Q3_A = Loan.objects.filter(response_timestamp__range=('2023-10-01 00:00:00.000000','2023-12-31 23:59:59.999999')).aggregate(Sum('loan_principal_amount'))
        Q4_A = Loan.objects.filter(response_timestamp__range=('2024-01-01 00:00:00.000000','2024-03-31 23:59:59.999999')).aggregate(Sum('loan_principal_amount'))
        
        Q_A_list = [Q1_A['loan_principal_amount__sum'],Q2_A['loan_principal_amount__sum'],Q3_A['loan_principal_amount__sum'],Q4_A['loan_principal_amount__sum']]
        Q_A_data = [i if i!=None else 0 for i in Q_A_list ]
        
        
        #Quaterly loan sanctioning amount
        Q1_C = Application.objects.filter(application_timestamp__range=('2023-04-01 00:00:00.000000','2023-06-30 23:59:59.999999')).aggregate(Count('id'))
        Q2_C = Application.objects.filter(application_timestamp__range=('2023-07-01 00:00:00.000000','2023-09-30 23:59:59.999999')).aggregate(Count('id'))
        Q3_C = Application.objects.filter(application_timestamp__range=('2023-10-01 00:00:00.000000','2023-12-31 23:59:59.999999')).aggregate(Count('id'))
        Q4_C = Application.objects.filter(application_timestamp__range=('2024-01-01 00:00:00.000000','2024-03-31 23:59:59.999999')).aggregate(Count('id'))
        
        Q_C_list = [Q1_C['id__count'],Q2_C['id__count'],Q3_C['id__count'],Q4_C['id__count']]
        Q_C_data = [i if i!=None else 0 for i in Q_C_list ]
        
        return Response(data={'Q_A_data':Q_A_data,'Q_C_data':Q_C_data,'Quaters':Quaters})
    
    #Monthly and Yeary sanctioning loan amount
    def post(self,request):
        year = '2023'
        month_no = [4,5,6,7,8,9,10,11,12,1,2,3]
        Months = ['FY2023-24','April','May','June','July','August','Sept','Oct','Nov','Dec','Jan','Feb','March']
        YLAmount = Loan.objects.filter(response_timestamp__year="2023").aggregate(Sum('loan_principal_amount'))
        #Month loan sanctioning amount
        Month_loan_amount = list(map(lambda x : Loan.objects.filter(response_timestamp__year="2023",response_timestamp__month=str(x)).aggregate(Sum('loan_principal_amount')),month_no))
        MLAmount = [v for i in Month_loan_amount for v in i.values()]
        YLAmount = [YLAmount['loan_principal_amount__sum']]
        MLAmount = YLAmount + [ i if i!=None else 0 for i in MLAmount ]
        #Yeary loan sancationing amount
        
        
        #Monthly application count
        YACount = Application.objects.filter(application_timestamp__year="2023").aggregate(Count('id'))
        Month_Application_count = list(map(lambda x : Application.objects.filter(application_timestamp__year="2023",application_timestamp__month=str(x)).aggregate(Count('id')),month_no))
        MACount = [v for i in Month_Application_count for v in i.values()]
        YACount = [YACount['id__count']]
        MACount = YACount + [ i if i!=None else 0 for i in MACount ]
        
        #Yearly application count
        
        return Response(data={'MLAmount':MLAmount,'MACount':MACount,'Months':Months})
    

#Adding to Defaulter list


class DefaulterList(APIView):
    def get(self, request, format=None):
        defaulters = Defaulter.objects.all()
        serializer = DefaulterModelSerializer(defaulters, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    
class CheckDefaulterAPIView(APIView):
    
    def post(self,request,pk=None):
        application = Application.objects.get(id=pk)
        loanId = Loan.objects.get(application=pk)
        disbursement_object = get_object_or_404(Disbursement,loan_id=loanId)
        disbursement_date = disbursement_object.response_timestamp.date()
        disbursement_amount = disbursement_object.net_disbursed_amount
        current_date = datetime.today().date()
        print(application.user)
        print(Defaulter.objects.filter(user=application.user))
        
        if Defaulter.objects.filter(user=application.user).exists():
            return Response(data={'message':'Already added into defaulter list'}) 
            
        else:
            try:
                last_date = Installment.objects.filter(loan_id=loanId).last().installment_expected_date
                print(last_date)
                remaining_amount = Installment.objects.filter(loan_id=loanId).last().remaining_amount
                print(remaining_amount)
                days_diff = (current_date - last_date).days
                print('1nd',days_diff)
                
                    
                if days_diff > 90:
                    defaulter, created = Defaulter.objects.get_or_create(user=application.user)
                    defaulter.default_amount = remaining_amount
                    defaulter.pending_since_date = last_date
                    defaulter.save()
                    return Response(data={'message':'Added to defaulter list'})
                else:
                    return Response(data={'message':'no need to add into defaulter list'})
                
                
            except:
                last_date = disbursement_date
                print(last_date)
                days_diff = (current_date - last_date).days
                print('2nd',days_diff)
                if days_diff > 90:
                    defaulter, created = Defaulter.objects.get_or_create(user=application.user)
                    defaulter.default_amount = disbursement_amount
                    defaulter.pending_since_date = last_date
                    defaulter.save()
                    return Response(data={'message':'Added to defaulter list'}) 
            
        return Response(data={'message':'no need to add into defaulter list'})
