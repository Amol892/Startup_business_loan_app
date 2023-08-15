from rest_framework import serializers
from .models import *


class ApplicationModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Application
        fields='__all__'
        depth = 1