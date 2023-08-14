from rest_framework.views import APIView
from .models import User
from .serializers import UserModelSerializer
from rest_framework import status
from rest_framework.response import Response

class UserAPIView(APIView):

    def get(self,request):
        users=User.objects.all()
        serializer=UserModelSerializer(users,many=True)
        return Response(data=serializer.data,status=status.HTTP_200_OK)
    
    
    def post(self,request):
        serializer=UserModelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data,status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    

        

