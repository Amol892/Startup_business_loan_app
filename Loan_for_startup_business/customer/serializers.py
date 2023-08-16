from rest_framework import serializers
from .models import Enquiry


# Enquiry model serializer
class EnquiryModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = ['first_name','last_name','email','mobile','message','status','enquiry_date']
        

class EnquirySerializer(serializers.Serializer):
    email = serializers.EmailField()
    
