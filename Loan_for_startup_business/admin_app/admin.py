from django.contrib import admin
from .models import Family,Bank,User

class UserAdmin(admin.ModelAdmin):
    list_display=['email','password','username','first_name','last_name','is_active']

admin.site.register(User,UserAdmin)

class FamilyAdmin(admin.ModelAdmin):
    list_display=['father_name','user']

admin.site.register(Family,FamilyAdmin)

class BankAdmin(admin.ModelAdmin):
    list_display=['bank_name','user','account_number']

admin.site.register(Bank,BankAdmin)








