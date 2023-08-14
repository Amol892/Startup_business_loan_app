
from django.contrib import admin
from .models import Loan,Vendor



class LoanAdmin(admin.ModelAdmin):
    list_display=['loan_principal_amount','application']

admin.site.register(Loan,LoanAdmin)

class VendorAdmin(admin.ModelAdmin):
    list_display=['name','application']

admin.site.register(Vendor,VendorAdmin)

