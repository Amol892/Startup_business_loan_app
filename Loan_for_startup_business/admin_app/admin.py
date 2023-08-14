from django.contrib import admin
from .models import User,Family,Bank


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display=('first_name','last_name','dob','email','password','permanent_address','photo','signature')

@admin.register
class FamilyAdmin(admin.ModelAdmin):
    list_display=('user',' father_name',' father_profeesion','father_income','mother_name',
                  'spouse_name',)
    
