from rest_framework import serializers  
from .models import *

class InstallmentModelserializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = '__all__'
        depth = 4