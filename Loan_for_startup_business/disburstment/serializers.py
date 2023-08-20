from rest_framework import serializers
from .models import Disbursement, Installment, Defaulter



class DisbursementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disbursement
        fields = "__all__"

class InstallmentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = "__all__"

class DefaulterModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defaulter
        fields = "__all__"
