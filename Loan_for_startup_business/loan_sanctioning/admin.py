from django.contrib import admin
from .models import *
# Register your models here.

class LoanAdmin(admin.ModelAdmin):
    list_display=['id','application','loan_principal_amount','response_timestamp','status']
    
admin.site.register(Loan,LoanAdmin)


class VendorAdmin(admin.ModelAdmin):
    list_display=['id','application','name','vendor_type']
    
admin.site.register(Vendor,VendorAdmin)