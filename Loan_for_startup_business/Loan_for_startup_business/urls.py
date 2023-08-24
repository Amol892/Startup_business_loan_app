

#from rest_framework_swagger.views import get_swagger_view
#from rest_framework.schemas import get_schema_view
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from admin_app.views import UserView, FamilyView, BankView, BankDetails
from customer.views import EnquiryView
from application_generation.views import ApplicationAPI, GuarantorAPI, DocumentAPI, ApplicationRegrdingMail, DocumentDetailsAPI, ApplicationDetailsAPI, GuarantorDetailsAPI
from disburstment.views import DisbursementAPI, DisbursementDetailsAPI
from loan_sanctioning.views import LoanAPI, LoanDetailsAPI, VendorAPI, VendorDetailsAPI
from rest_framework_simplejwt.views import token_refresh, token_obtain_pair
from django.conf import settings
from django.conf.urls.static import static

#schema_view = get_swagger_view(title='Quick Loan API')

router = DefaultRouter()
router.register("userview",UserView, basename="userview")
router.register("familyview", FamilyView, basename="familyview")
router.register("bankview", BankView, "bankView")
router.register("enquiryview", EnquiryView, "enquiryview")

#app_name = 'Loan_for_startup_business'

urlpatterns = [
    path('admin/', admin.site.urls),
    path("access/", token_obtain_pair),
    path('record/<int:pk>/', BankDetails.as_view()),
    path("token/", token_refresh),
    path("", include(router.urls)),
    path("application/", ApplicationAPI.as_view(), name="application"),
    path("application_details/<int:pk>/", ApplicationDetailsAPI.as_view(), name="application_details"),
    path("guarantor/", GuarantorAPI.as_view(), name="guarantor"),
    path("guarantor_details/<int:pk>/", GuarantorDetailsAPI.as_view(), name="guarantor_details"),
    path("document/", DocumentAPI.as_view(), name="document"),
    path("application_document_details/<int:pk>/", DocumentDetailsAPI.as_view(), name="application_document_details" ),
    path("application_regarding_mail/", ApplicationRegrdingMail.as_view(), name="application_regarding_mail"),
    path("disbursement/", DisbursementAPI.as_view(), name="disbursement"),
    path("disbursement_details/<int:pk>/", DisbursementDetailsAPI.as_view(), name="disbursement_details"),
    path("loan/", LoanAPI.as_view(), name="loan"),
    path("loan_details/<int:pk>/", LoanDetailsAPI.as_view(), name="loan_details"),
    path("vendor_application/", VendorAPI.as_view(), name="vendor_application"),
    path("vendor_details/<int:pk>/", VendorDetailsAPI.as_view(), name="vendor_details"),
    #path('api_schema/', get_schema_view(title='quick_loan_aapi'), name='api_schema'),    

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
