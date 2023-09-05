from django.contrib import admin
from .models import User,Family,Bank
# Register your models here.

class UserAdmin(admin.ModelAdmin):
    list_display = ['id','email','password','username','first_name','last_name','role','is_active']
    
admin.site.register(User,UserAdmin)


class FamilyAdmin(admin.ModelAdmin):
    list_display=['id','user','father_name']
    
admin.site.register(Family,FamilyAdmin)


class BankAdmin(admin.ModelAdmin):
    list_display=['user','bank_name','account_number','ifsc_code']
    
admin.site.register(Bank,BankAdmin)