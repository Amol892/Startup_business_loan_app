from django.contrib import admin
from .models import Application,Document

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    
    list_display=('user','type_of_employment','business_title',
                'business_type','business_address','expected_average_annual_turnover',
                'years_in_current_business','collateral',
                 'status','application_timestamp','remark')
    
@admin.register(Document)
class DocumetAdmin(admin.ModelAdmin):
    list_display=('application','aadhar_card','pan_card',
                  'business_address_proff_or_copy_of_rent_agreement',
                 'electricity_bill')
