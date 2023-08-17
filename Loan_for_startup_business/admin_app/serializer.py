from rest_framework import serializers
from .models import Family, User
from loan_sanctioning.models import Loan
from disburstment.models import Installment, Defaulter
from application_generation.models import Application

# from django.contrib.auth.hashers
class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = (
            "id","user","father_name","father_profeesion","father_income","father_contact","mother_name","mother_profeesion",
            "mother_income","mother_contact","martial_status","spouse_name","spouse_income","spouse_profeesion","spouce_contact"
        )

    def create(self, validated_data):
        return Family.objects.create_user(**validated_data)
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields = "__all__"

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class EMICalculatorSerializer(serializers.Serializer):
    principal = serializers.FloatField()
    interest_rate = serializers.FloatField()
    tenure_years = serializers.IntegerField()


# class LoanSerializer(serializers.ModelSerializer):
#     installments = InstallmentSerializer(many=True, read_only=True)

#     class Meta:
#         model = Loan
#         fields = '__all__'

# class ApplicationSerializer(serializers.ModelSerializer):
#     loans = LoanSerializer(source='loan_set', many=True, read_only=True)

#     class Meta:
#         model = Application
#         fields = '__all__'


class InstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = '__all__'

class LoanSerializer(serializers.ModelSerializer):
    installments = InstallmentSerializer(many=True, read_only=True)
    class Meta:
        model = Loan
        fields = '__all__'

class DefaulterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defaulter
        fields = '__all__'

class ApplicationSerializer(serializers.ModelSerializer):
    loans = LoanSerializer(read_only=True)
    defaulters = DefaulterSerializer(source='user.defaulters', read_only=True)
    class Meta:
        model = Application
        fields = '__all__'

