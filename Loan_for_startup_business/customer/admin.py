from django.contrib import admin
from .models import Enquiry



class EnquiryAdmin(admin.ModelAdmin):
    list_display=['first_name','last_name','mobile']

admin.site.register(Enquiry,EnquiryAdmin)


