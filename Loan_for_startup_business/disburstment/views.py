from .models import Disbursement
from .serializers import DisbursementModelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class DisbursementAPI(APIView):
    def get(self, request):
        obj = Disbursement.objects.all()
        serializer = DisbursementModelSerializer
        return Response(data=serializer.data)
    
    def post(self, request):
        serializer = DisbursementModelSerializer
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        return Response(data=serializer.errors)
    
class DisbursementDetailsAPI(APIView):
    def get(self, request, pk):
        obj = get_object_or_404(Disbursement, loan_id=pk)
        serializer = DisbursementModelSerializer(obj)
        return Response(data=serializer.data)
    
    def patch(self, request, pk):
        pass