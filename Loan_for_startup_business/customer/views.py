import json
from django.shortcuts import get_object_or_404, render,redirect
from .serializers import EnquiryModelSerializer,EnquirySerializer
from .models import Enquiry
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import random
from django.core.mail import send_mail
from application_generation.serializers import ApplicationModelSerializer
from admin_app.models import User
from admin_app.serializers import RegisterModelSerializer
from loan_sanctioning.models import Loan
from application_generation.models import Application
from loan_sanctioning.serializers import LoanModelSerializer
from disburstment.serializers import InstallmentModelserializer
from disburstment.models import Installment,Disbursement
from datetime import datetime
from .utiles import Calculate_EMI,calculate_emi_schedule
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated,IsAdminUser,IsAuthenticatedOrReadOnly
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
            
class CustomerLoanAPIView(APIView):
    authentication_classes = [JWTAuthentication,]
    permission_classes = [IsAuthenticated]
    def get(self,request,email=None):
        userId = get_object_or_404(User,email=email)
        applicationId = Application.objects.select_related('user').get(user=userId)
        loanData=Loan.objects.select_related('application').get(application=applicationId)
        serializer = LoanModelSerializer(loanData)
        return Response(data = serializer.data)
    
class CustomerInstallmentAPIView(APIView):
    authentication_classes = [JWTAuthentication,]
    permission_classes = [IsAuthenticated]
    def get(self,request,email=None):
        try:
            userId = get_object_or_404(User,email=email)
            applicationId = Application.objects.select_related('user').get(user=userId)
            loanId=Loan.objects.select_related('application').get(application=applicationId)
            installmentData = Installment.objects.select_related('loan').filter(loan=loanId)
            serializer = InstallmentModelserializer(installmentData,many=True)
            return Response(data = serializer.data)
        except:
            return Response(data={'message':'installments are not paid yet'})

   
class EMIPaymentAPIView(APIView):
    authentication_classes = [JWTAuthentication,]
    permission_classes = [IsAuthenticated]
    def get(self,request,email=None):
        userId = get_object_or_404(User,email=email)
        applicationId = Application.objects.select_related('user').get(user=userId)
        loanId=Loan.objects.select_related('application').get(application=applicationId)
        disbursedId = Disbursement.objects.select_related('loan').get(loan=loanId)
        installmentData = Installment.objects.filter(loan=loanId)
        serializer = InstallmentModelserializer(installmentData,many=True)
        #serializer_loan = LoanModelSerializer(loanId,many=True)
        
        Loan_amount = disbursedId.net_disbursed_amount
        Tenure = loanId.loan_tenure
        Interest_rate = loanId.interest_rate
        EMI_amount = Calculate_EMI(Loan_amount,Tenure,Interest_rate)
        EMI_amount = f"{EMI_amount: .2f}"
        Paid_installment_dates = installmentData.values_list('installment_paid_date')
        loan_id = loanId.id
        Loan_disbursement_date = disbursedId.response_timestamp
        total_months = int(Tenure * 12)
        installment_number_list = [i for i in range(1,total_months+1)]
        Paid_installment_numbers = [i[0] for i in list(installmentData.values_list('installment_number'))]
        
        remaining_installment_numbers = [item for item in installment_number_list if item not in Paid_installment_numbers]
        
        
        EMI_schedule_list = calculate_emi_schedule(EMI_amount,Loan_disbursement_date,Tenure)
        
        data = {
            'loan_id': loan_id ,
            'Installment_data' : serializer.data,
            'EMI_amount' : float(EMI_amount),
            'Loan_amount':float(Loan_amount),
            'Loan_disbursement_date' : Loan_disbursement_date,
            'Paid_installment_dates' : Paid_installment_dates,
            'installment_number_list':installment_number_list,
            'remaining_installment_numbers':remaining_installment_numbers,
            'EMI_schedule_list' : EMI_schedule_list
        }
         
        return Response(data,status=status.HTTP_200_OK)

#Razorpay 
import environ
import razorpay
env = environ.Env()
environ.Env.read_env()


class PayAPIView(APIView):
    authentication_classes = [JWTAuthentication,]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        print(request.data['installment_paid_date'])
        
       
        loanid = request.data['loanid']
        Loan_amount = request.data['loan_amount']
        installment_number = request.data['installment_number']
        installment_expected_date = datetime.strptime(request.data['installment_expected_date'],"%Y-%m-%dT%H:%M:%S.%fZ").strftime("%Y-%m-%d")
        installment_paid_date = datetime.strptime(request.data['installment_paid_date'],"%d %B %Y at %I:%M:%S %p").strftime("%Y-%m-%d")
        EMI_amount = request.data['EMI_amount']
        paid_amount = request.data['paid_amount']
        print(installment_expected_date)
        
        
        # setup razorpay client this is the client to whome user is paying money that's you
        client = razorpay.Client(auth=(env('PUBLIC_KEY'), env('SECRET_KEY')))

        # create razorpay order
        # the amount will come in 'paise' that means if we pass 50 amount will become
        # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
        # mumtiply it by 100 so it will be 50 rupees.
        payment = client.order.create({"amount": float(paid_amount) * 100, "currency": "INR", "payment_capture": "1"})

        installment_obj = Installment.objects.create(
            loan_id = loanid,
            order_payment_id = payment['id'],
            remaining_amount = float(Loan_amount) - float(EMI_amount),
            installment_number = installment_number,
            monthly_installment_number = EMI_amount,
            installment_expected_date = installment_expected_date,
            installment_paid_date = installment_paid_date,
            penalty_amount = float(paid_amount) - float(EMI_amount)
            
        )
        
        serializer = InstallmentModelserializer(installment_obj)
        
        data = {
            'payment' : payment,
            'installment_obj' : serializer.data
        }
        
        return Response(data=data)
    
class HandlePaymentSuccess(APIView):
    authentication_classes = [JWTAuthentication,]
    permission_classes = [IsAuthenticated]
    def post(self,request):
        # request.data is coming from frontend
        res = json.loads(request.data["response"])
        print(res)
        """res will be:
        {'razorpay_payment_id': 'pay_G3NivgSZLx7I9e', 
        'razorpay_order_id': 'order_G3NhfSWWh5UfjQ', 
        'razorpay_signature': '76b2accbefde6cd2392b5fbf098ebcbd4cb4ef8b78d62aa5cce553b2014993c0'}
        this will come from frontend which we will use to validate and confirm the payment
        """

        ord_id = ""
        raz_pay_id = ""
        raz_signature = ""

        # res.keys() will give us list of keys in res
        for key in res.keys():
            if key == 'razorpay_order_id':
                ord_id = res[key]
            elif key == 'razorpay_payment_id':
                raz_pay_id = res[key]
            elif key == 'razorpay_signature':
                raz_signature = res[key]

        # get order by payment_id which we've created earlier with isPaid=False
        order = Installment.objects.get(order_payment_id=ord_id)
        print(order)
        # we will pass this whole data in razorpay client to verify the payment
        data = {
            'razorpay_order_id': ord_id,
            'razorpay_payment_id': raz_pay_id,
            'razorpay_signature': raz_signature
        }

        print(data)
        client = razorpay.Client(auth=(env('PUBLIC_KEY'), env('SECRET_KEY')))

        # checking if the transaction is valid or not by passing above data dictionary in 
        # razorpay client if it is "valid" then check will return None
        check = client.utility.verify_payment_signature(data)
        print(check)
        if check is not True:
            print("Redirect to error url or error page")
            return Response({'error': 'Something went wrong'})

        # if payment is successful that means check is None then we will turn status = ok or late
        installment_expected_date = order.installment_expected_date,
        installment_paid_date = order.installment_paid_date,
        
        if installment_paid_date > installment_expected_date :
            order.status = 'late'
            order.save()
        else:
            order.status = 'ok'
            order.save()

        res_data = {
            'message': 'payment successfully received!'
        }

        return Response(res_data)