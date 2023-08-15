from rest_framework import serializers
from .models import Loan

class LoanModelSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = "__all__"