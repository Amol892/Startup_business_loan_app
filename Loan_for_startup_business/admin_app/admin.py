from django.contrib import admin
from admin_app.models import User, Family, Bank

# Register your models here.
admin.site.register(User)
admin.site.register(Family)
admin.site.register(Bank)