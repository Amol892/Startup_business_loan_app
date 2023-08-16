from rest_framework import serializers
from .models import Loan


class LoanModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'
        depth = 3
        