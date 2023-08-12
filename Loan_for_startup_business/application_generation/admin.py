from django.contrib import admin
from application_generation.models import Application, Document, Guarantor

admin.site.register(Application)
admin.site.register(Document)
admin.site.register(Guarantor)

# Register your models here.
