from rest_framework import serializers  
from .models import *

class InstallmentModelserializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = '__all__'
        depth = 4
        
class DisbursementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disbursement
        fields = "__all__"
        depth = 3
        
class DefaulterModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defaulter
        fields = "__all__"
        depth = 3