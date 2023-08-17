from django.contrib import admin
from .models import Family, Bank, User
from application_generation.models import Application
from loan_sanctioning.models import Loan
from disburstment.models import Installment

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

class ApplicationAdmin(admin.ModelAdmin):
    list_display= [
                    "id",
                    "user" ,
                    "aaddar_no" ,
                    "pan_no",
                    "type_of_employment" ,
                    "business_title",
                    "business_type",
                    "business_address",
                    "gst_registration_no",
                    "business_license_no",
                    "expected_average_annual_turnover" ,
                    "years_in_current_business",
                    "collateral",
                    "status",
                    "application_timestamp" ,
                    "remark",
    ]
admin.site.register(Application,ApplicationAdmin)

class LoanAdmin(admin.ModelAdmin):
    list_display =[
                "id",
                "application",
                "loan_principal_amount",
                "loan_tenure", 
                "interest_rate", 
                "total_amount_and_processing_fees", 
                "installment",
                "maturity_date", 
                "sanction_letter", 
                "status", 
                "response_timestamp", 
                "remark", 
    ]
admin.site.register(Loan,LoanAdmin)

class InstallmentAdmin(admin.ModelAdmin):
    list_display=[
                "id",
                "loan",
                "remaining_amount", 
                "installment_number", 
                "monthly_installment_number",
                "installment_expected_date",
                "installment_paid_date",
                "penalty_amount",
                "status", 
    ]
admin.site.register(Installment,InstallmentAdmin)