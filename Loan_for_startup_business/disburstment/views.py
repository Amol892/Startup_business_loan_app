from .models import Disbursement
from .serializers import DisbursementModelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from loan_sanctioning.models import Loan
from admin_app.models import User
from application_generation.models import Application
from django.core.mail import send_mail


class DisbursementAPI(APIView):
    def get(self, request):
        obj = Disbursement.objects.all()
        serializer = DisbursementModelSerializer
        return Response(data=serializer.data)
    
    def post(self, request):
        serializer = DisbursementModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            status = request.data["status"]
            loan = request.data["loan"]
            app_id = Loan.objects.get(id=loan)
            a_id = app_id.application_id
            u_id = Application.objects.get(id=a_id)
            us_id = u_id.user_id
            email_id = User.objects.get(id=us_id)
            customer_email = email_id.email
            print(customer_email)
            if status == "Disbursed":
                body = "Congratulation Your Loan has been disbursed in Vender Account"
                office_mail = "loanforstartupsinc@gmail.com"
                c_mail = "chetangujar999@gmail.com"
                send_mail(f"This is LoannApplication Regarding Mail", body, office_mail, [f"{c_mail}"], fail_silently=False)
            return Response(data=serializer.data)
        return Response(data=serializer.errors)
    
class DisbursementDetailsAPI(APIView):
    def get(self, request, pk):
        obj = get_object_or_404(Disbursement, loan_id=pk)
        serializer = DisbursementModelSerializer(obj)
        return Response(data=serializer.data)
    
    def patch(self, request, pk):
        pass

