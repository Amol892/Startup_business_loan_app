from rest_framework.views import APIView
from application_generation.models import Document,Application
from .serializers import DocumentModelSerializer,ApplicationModelSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class ApplicationAPIView(APIView):


    def get(self,request):
        applications=Application.objects.all()
        serializer=ApplicationModelSerializer(applications,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    

class DocumentAPIView(APIView):

    def get(self,request,pk):
        document=get_object_or_404(Document,pk)
        serializer=DocumentModelSerializer(document)
        return Response(data=serializer.data,status=status.HTTP_200_OK)

