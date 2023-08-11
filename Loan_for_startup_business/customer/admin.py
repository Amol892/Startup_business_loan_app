from django.contrib import admin
from .models import Enquiry

# Register your models here.

class EnquiryAdmin(admin.ModelAdmin):
    list_display = ['first_name','last_name','email','mobile','message']
    
admin.site.register(Enquiry,EnquiryAdmin)