from rest_framework import serializers
from .models import Bank

class BankModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bank
        fields='__all__'
        

class LoanstatusSerializer(serializers.Serializer):
    status = serializers.CharField()  