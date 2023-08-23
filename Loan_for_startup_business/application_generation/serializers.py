from rest_framework import serializers
from .models import *


class ApplicationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Application
        fields='__all__'
        depth = 3
        
class DocumentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"
        depth = 3
        
class GurantorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guarantor
        fields = "__all__"
        depth = 3