from django.contrib import admin
from .models import  *
# Register your models here.
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ['id','user','status','remark']
    
admin.site.register(Application,ApplicationAdmin)


class GuarantorAdmin(admin.ModelAdmin):
    list_display = ['id','application','name','relation_with_customer']
    
admin.site.register(Guarantor,GuarantorAdmin)


class DocumentAdmin(admin.ModelAdmin):
    list_display = ['id','application','status','remark']
    
admin.site.register(Document,DocumentAdmin)
