from rest_framework import serializers
from .models import *
from disburstment.models import *
from application_generation.models import Application
#User registeration
class RegisterModelSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email', 'gender', 'mobile','dob','permanent_address','current_address','photo','signature','role')
       
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    
#User login
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    
#Family Model
class FamilyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = [
            "id","user","father_name","father_profeesion","father_income","father_contact","mother_name","mother_profeesion",
            "mother_income","mother_contact","martial_status","spouse_name","spouse_income","spouse_profeesion","spouce_contact"
        ]

    
#Bank Model
class BankModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Bank
        fields='__all__'
        
#EMI Calculator
class EMICalculatorSerializer(serializers.Serializer):
    principal = serializers.FloatField()
    interest_rate = serializers.FloatField()
    tenure_years = serializers.IntegerField()
    
#Defaulter Model
class DefaulterModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Defaulter
        fields = '__all__'
        depth = 1
        
        
class ApplicationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
        depth = 2