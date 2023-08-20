from django.contrib import admin
from .models import Disbursement, Installment, Defaulter

admin.site.register(Disbursement)
admin.site.register(Installment)
admin.site.register(Defaulter)


# Register your models here.
