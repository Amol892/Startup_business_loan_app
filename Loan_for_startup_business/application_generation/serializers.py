from rest_framework import serializers
from .models import Application, Guarantor, Document

class AppplicationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Application
        fields = "__all__"
    
class GurantorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guarantor
        fields = "__all__"

class DocumentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"