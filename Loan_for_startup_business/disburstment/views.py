from django.shortcuts import get_object_or_404, render
from .serializers import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from loan_sanctioning.models import Loan
from application_generation.models import Application
from application_generation.serializers import ApplicationModelSerializer
from admin_app.models import Bank,Family,User
import json
# Create your views here.

class InstallmentAPIView(APIView):
    
    def get(self,request,pk=None):
        
        loan_obj = get_object_or_404(Loan,application=pk)
        loan_id = loan_obj.id
        Installment_obj = Installment.objects.select_related('loan').filter(loan=loan_id)
        serializer = InstallmentModelserializer(Installment_obj,many=True)
        
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    
    
class InformationAPIView(APIView):
    
    def get(sef,request,pk=None):
        
        bank_obj = Bank.objects.select_related('user').filter(user=pk)
        applicationId= Application.objects.get(user=pk)
        loan_obj = Loan.objects.select_related('application').get(application=applicationId)
        bankserializer = BankModelSerializer(bank_obj,many=True)
        loanserializer = LoanModelSerializer(loan_obj)
        loan_amount =loan_obj.loan_principal_amount
        processingFee = loan_amount*0.02
        PF_withGST = processingFee + processingFee*0.05
        loan_amount_after_PF_withGST = loan_amount - PF_withGST
        GST_on_loan_amount = loan_amount_after_PF_withGST * 0.18
        disburstment_amount = loan_amount_after_PF_withGST + GST_on_loan_amount
        data = {
            'bank_obj' : bankserializer.data,
            'loan_obj' : loanserializer.data,
            'loan_amount':loan_amount,
            'PF_withGST' : PF_withGST,
            'loan_amount_after_PF_withGST' : loan_amount_after_PF_withGST,
            'GST_on_loan_amount' : GST_on_loan_amount,
            'disburstment_amount' : disburstment_amount     
        }
        
        return Response(data=data,status=status.HTTP_200_OK)
    

#Razorpay 
import environ
import razorpay
env = environ.Env()
environ.Env.read_env()    

class PayLoanAmountAPIView(APIView):
    
    def post(self,request):

        print(request.data)
        disburstment_amount=request.data['net_disbursed_amount']
        print(disburstment_amount)
        
        
        
        
        
        # setup razorpay client this is the client to whome user is paying money that's you
        client = razorpay.Client(auth=(env('PUBLIC_KEY'), env('SECRET_KEY')))

        # create razorpay order
        # the amount will come in 'paise' that means if we pass 50 amount will become
        # 0.5 rupees that means 50 paise so we have to convert it in rupees. So, we will 
        # mumtiply it by 100 so it will be 50 rupees.
        payment = client.order.create({"amount": float(disburstment_amount) * 100, "currency": "INR", "payment_capture": "1"})

        
           
        print(request.data.get('loan'))
        
        loanId = request.data['loan']   
        disburstment_obj = Disbursement.objects.create(
            
            order_payment_id = payment['id'],
            payment_mode = request.data['payment_mode'],
            net_disbursed_amount = request.data['net_disbursed_amount'],
            disbursed_to_account_no = request.data['disbursed_to_account_no'],
            receipt_doc = request.data['receipt_doc'],
            status = 'pending',
            loan_id = loanId
            )
        
        serializer = DisbursementModelSerializer(disburstment_obj)
        data = {
            'payment' : payment,
            'disburstment_obj' : serializer.data
            }
        
        return Response(data=data,status=status.HTTP_200_OK)
        
        
        
        
    
class HandlePaymentSuccess(APIView):
    
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
        order = Disbursement.objects.get(order_payment_id=ord_id)
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
        
        order.status = 'disbursed'
        order.save()
        

        res_data = {
            'message': 'payment successfully received!'
        }

        return Response(res_data)

        
    
 