from rest_framework import serializers  
from .models import *
from admin_app.models import Bank
from loan_sanctioning.models import Loan

class InstallmentModelserializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = '__all__'
        depth = 4
        
class DisbursementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disbursement
        fields = "__all__"
        
        
class DefaulterModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defaulter
        fields = "__all__"
        depth = 3
        
class BankModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank 
        fields = '__all__'
        depth = 2
        
class LoanModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'
        depth = 3