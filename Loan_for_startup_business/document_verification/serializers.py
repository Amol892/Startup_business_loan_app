from rest_framework import serializers
from application_generation.models import Document


class DocumentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields = '__all__'
        depth = 3