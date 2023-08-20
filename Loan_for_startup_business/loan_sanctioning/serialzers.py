from rest_framework import serializers
from .models import Loan, Vendor

class LoanModelSerilizer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = "__all__"

class VendorModelserializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = "__all__"