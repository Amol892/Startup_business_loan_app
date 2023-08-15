from rest_framework import serializers
from .models import Disbursement
from loan_sanctioning.models import Loan




class DisbursementModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disbursement
        fields = "__all__"
