from .models import Loan, Vendor
from .serialzers import LoanModelSerilizer, VendorModelserializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.core.mail import EmailMessage
import os


class LoanAPI(APIView):
    def get(self, request):
        obj = Loan.objects.all()
        serializer = LoanModelSerilizer
        return Response(data=serializer.data)
    
    def post(self, request):
        serializer = LoanModelSerilizer(data=request.data)
        if serializer.is_valid():
            serializer.save()#remaining send details to customer mail about loan saction and saction letter
            app_id = request.data["application"]
            l_id = Loan.objects.get(application=app_id)
            sanction_file = l_id.sanction_letter #file path here
            print(str(sanction_file))
            office_mail = "loanforstartupsinc@gmail.com"
            chetan_mail = "chetangujar999@gmail.com"
            email = EmailMessage("hi chetan", f"this is ur sanction letter", office_mail, [f"{chetan_mail}"])
            email.attach(sanction_file)
            email.send()
            return Response(data=serializer.data)
        return Response(data=serializer.errors)
    
class LoanDetailsAPI(APIView):
    def get(self, request, pk):
        obj = get_object_or_404(Loan, application_id=pk)
        serializer = LoanModelSerilizer(obj)
        return Response(data=serializer.data)

class VendorAPI(APIView):
    def get(self, request):
        obj = Vendor.objects.all()
        serializer = VendorModelserializer
        return Response(data=serializer.data)
    
    def post(self, request):
        serializer = VendorModelserializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        return Response(data=serializer.errors)
    
class VendorDetailsAPI(APIView):
    def get(self, request, pk):
        obj = get_object_or_404(Vendor, application_id=pk)
        serializer = VendorModelserializer(obj)
        return Response(data=serializer.data)

    
    