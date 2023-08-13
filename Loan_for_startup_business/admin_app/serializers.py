from rest_framework import serializers
from .models import User, Family, Bank

class UserModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id","username","dob","gender","email","permanent_address","current_address","mobile","photo","signature","role"
        ]

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class FamilyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = "__all__"

class BankModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = "__all__"