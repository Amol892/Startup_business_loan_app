from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import RegisterModelSerializer,LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import token_obtain_pair,TokenObtainPairView
from .models import User
from .utiles import detectUser
#User registeration view
class RegisterAPIView(APIView):
       
    def post(self,request):
        serializer=RegisterModelSerializer(data=request.data)
        print(request.data.get('role'))
        if serializer.is_valid():
            
            serializer.save()
            
            return Response(data={'message':'Your account is created and check mail for account activation link'},status=status.HTTP_201_CREATED)
        return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    



class LoginAPIView(TokenObtainPairView):
    
    def post(self,request):
            serializer = LoginSerializer(data=request.data)
            if serializer.is_valid():
                email = serializer.validated_data['email']
                user = User.objects.get(email=email)
                print(user)
                response = super().post(request)
                if response.status_code == status.HTTP_200_OK:
                    
                    redirectURL = detectUser(user)
                    
                    url_data = {'redirectURL':redirectURL}
                    response.data.update(url_data)
                    return Response(data=response.data)
            return Response(data=serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        