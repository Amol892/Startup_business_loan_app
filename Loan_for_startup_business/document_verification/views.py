from django.shortcuts import get_object_or_404, render
from .serializers import DocumentModelSerializer
from rest_framework.views import APIView
from application_generation.models import Document
from rest_framework.response import Response
from rest_framework import status
from application_generation.models import Application
# Create your views here.

class DocumentVerifyAPIVIew(APIView):
    
    def get(self,request,pk=None):
        Document_obj = get_object_or_404(Document,application = pk)
        serializer = DocumentModelSerializer(Document_obj)
        return Response(data = serializer.data,status=status.HTTP_200_OK)
    
    def patch(self,request,pk):
        print(pk)
        Application_object=get_object_or_404(Application,pk = pk)
        Document_object=get_object_or_404(Document,application = pk)
        s1=request.data.get('s1')
        print(request.data)
        if s1=='approve':
            Application_object.status = 'Apporve'
            Application_object.remark = 'All documents are clear'
            Document_object.status='done'
            Document_object.remark='done'
            Application_object.save()
            Document_object.save()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        elif s1=='rejected':
            Application_object.status = 'Rejected'
            Application_object.remark = 'Invalid documents'
            Document_object.status='rejected'
            Document_object.remark='rejected'
            Application_object.save()
            Document_object.save()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        else:
            return Response(status=status.HTTP_200_OK)