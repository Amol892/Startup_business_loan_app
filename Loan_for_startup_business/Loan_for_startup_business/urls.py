from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('customer/',include('customer.urls')),
    path('admin_app/',include('admin_app.urls')),
    path('disburstment/',include('disburstment.urls')),
    path('document_verify/',include('document_verification.urls')),
    path('application_generation/',include('application_generation.urls')),
    path('loan_sanctioning/',include('loan_sanctioning.urls'))
    
]

if settings.DEBUG:
    urlpatterns+=static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)