from rest_framework import serializers
from .models import Loan
from application_generation.models import Document

class LoanModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'
        depth = 3
        
class DocumentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
        depth= 2