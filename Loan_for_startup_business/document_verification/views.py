from rest_framework.views import APIView
from application_generation.models import Document,Application
from .serializers import DocumentModelSerializer,ApplicationModelSerializer
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404


class ApplicationAPIView(APIView):


    def get(self,request):
        application=Application.objects.select_related('user')
        serializer=ApplicationModelSerializer(application,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    

class DocumentAPIView(APIView):

    def get(self,request,pk):
        document=get_object_or_404(Document,pk=pk)
        serializer=DocumentModelSerializer(document)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request,pk):
        object=get_object_or_404(Document,pk=pk)
        s1=request.data.get('s1')
        if s1=='approve':
            object.status='done'
            object.remark='done'
            object.save()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        elif s1=='rejected':
            object.status='rejected'
            object.remark='rejected'
            object.save()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        else:
            return Response(status=status.HTTP_200_OK)

        
    
    
