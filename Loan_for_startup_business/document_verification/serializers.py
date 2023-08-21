from rest_framework import serializers
from application_generation.models import Application,Document

class ApplicationModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=Application
        fields="__all__"
        depth=1

class DocumentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Document
        fields="__all__"
        depth=1
    
        
        
   