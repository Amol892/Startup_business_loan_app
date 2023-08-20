from .models import Loan, Vendor
from .serialzers import LoanModelSerilizer, VendorModelserializer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

class LoanAPI(APIView):
    def get(self, request):
        obj = Loan.objects.all()
        serializer = LoanModelSerilizer
        return Response(data=serializer.data)
    
    def post(self, request):
        serializer = LoanModelSerilizer(data=request.data)
        if serializer.is_valid():
            serializer.save()
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

    
    