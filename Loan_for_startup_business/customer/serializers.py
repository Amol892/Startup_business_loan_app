from rest_framework import serializers
from .models import Enquiry

class EnquiryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = "__all__"