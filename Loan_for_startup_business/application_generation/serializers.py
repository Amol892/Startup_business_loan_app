from rest_framework import serializers
from .models import Application, Guarantor, Document
from admin_app.serializers import UserModelSerializer

class DocumentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = "__all__"

class AppplicationModelSerializer(serializers.ModelSerializer):
    
    documents = DocumentModelSerializer()
    #user = UserModelSerializer()
    class Meta:
        model = Application
        fields = "__all__"
    
class GurantorModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guarantor
        fields = "__all__"

