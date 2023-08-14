from rest_framework import serializers
from .models import User


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=('email','username','password','mobile','first_name','last_name')


    def create(self, validated_data):
        return User.objects.create_user(**validated_data)