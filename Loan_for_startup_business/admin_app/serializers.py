from rest_framework import serializers
from .models import User


class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email', 'gender', 'mobile','dob','permanent_address','current_address','photo','signature','role')


    def create(self, validated_data):
        return User.objects.create_user(**validated_data)