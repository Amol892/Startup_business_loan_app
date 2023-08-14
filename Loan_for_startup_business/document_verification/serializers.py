from rest_framework import serializers
from application_generation.models import Application,Document

class ApplicationModelSerializer(serializers.ModelSerializer):

    class Meta:
        model=Application
        fields=('user','type_of_employment','business_title',
                'business_type','business_address','expected_average_annual_turnover',
                'years_in_current_business','collateral',
                 'status','application_timestamp','remark')
        


class DocumentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model=Document
        fields='__all__'
        
   