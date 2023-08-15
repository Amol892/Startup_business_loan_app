from .models import Loan
from .serialzers import LoanModelSerilizer
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404

class LoanAPI(APIView):
    def get(self, request):
        obj = Loan.objects.all()
        serializer = LoanModelSerilizer
        return Response(data=serializer.data)
    
    def post(self, request):
        serializer = LoanModelSerilizer
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        return Response(data=serializer.data)
    
class LoanDetailsAPI(APIView):
    def get(self, request, pk):
        obj = get_object_or_404(Loan, application_id=pk)
        serializer = LoanModelSerilizer(obj)
        return Response(data=serializer.data)

