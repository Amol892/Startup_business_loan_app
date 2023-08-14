from django.contrib import admin
from .models import Defaulter,Disbursement,Installment



class DefaulterAdmin(admin.ModelAdmin):
    list_display=['default_amount','user']

admin.site.register(Defaulter,DefaulterAdmin)

class DisbursementAdmin(admin.ModelAdmin):
    list_display=['payment_mode','insurance_doc']

admin.site.register(Disbursement,DisbursementAdmin)

class InstallmentAdmin(admin.ModelAdmin):
    list_display=['loan','remaining_amount']

admin.site.register(Installment,InstallmentAdmin)

