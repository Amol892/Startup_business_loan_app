from django.contrib import admin
from .models import Application,Guarantor,Document

class ApplicationAdmin(admin.ModelAdmin):
    list_display=['user','aaddar_no','user_id']

admin.site.register(Application,ApplicationAdmin)

class GuarantorAdmin(admin.ModelAdmin):
    list_display=['name','email']

admin.site.register(Guarantor,GuarantorAdmin)

class DocumentAdmin(admin.ModelAdmin):
    list_display=['pan_card','aadhar_card']

admin.site.register(Document,DocumentAdmin)


