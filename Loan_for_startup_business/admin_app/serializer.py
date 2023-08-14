from rest_framework import serializers
from .models import Family, User
from loan_sanctioning.models import Loan

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