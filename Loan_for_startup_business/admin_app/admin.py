from django.contrib import admin
from .models import Family, Bank, User

# Register your models here.
class FamilyAdmin(admin.ModelAdmin):
    list_display = ['id',
                    'user',
                    'father_name',
                    'father_profeesion',
                    'father_income',
                    'father_contact',
                    'mother_name',
                    'mother_profeesion',
                    'mother_income',
                    'mother_contact',
                    'martial_status',
                    'spouse_name',
                    'spouse_income',
                    'spouse_profeesion',
                    'spouce_contact',
                    ]
admin.site.register(Family,FamilyAdmin)

class UserAdmin(admin.ModelAdmin):
    list_display=[
        "dob",
        "gender",
        "email",
        "permanent_address",
        "current_address",
        "mobile",
        "photo",
        "signature",
        "role",
    ]
admin.site.register(User,UserAdmin)

class BankAdmin(admin.ModelAdmin):
    list_display=[
        "user",
        "bank_name",
        "account_number",
        "ifsc_code",
        "passbook_copy",
        "bank_address"
    ]
admin.site.register(Bank,BankAdmin)