from django.contrib import admin
from .models import *
# Register your models here.

class DefaulterAdmin(admin.ModelAdmin):
    list_display = ['id','user','default_amount','pending_since_date']
    
admin.site.register(Defaulter,DefaulterAdmin)

class InstallmentAdmin(admin.ModelAdmin):
    list_display = ['id','loan','remaining_amount','status']
    
admin.site.register(Installment,InstallmentAdmin)


class DisbursementAdmin(admin.ModelAdmin):
    list_display=['id','loan','status']
    
admin.site.register(Disbursement,DisbursementAdmin)