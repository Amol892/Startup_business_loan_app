
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from admin_app.views import UserView, FamilyView, BankView
from customer.views import EnquiryView
from application_generation.views import ApplicationAPI, GuarantorAPI, DocumentAPI, ApplicationRegrdingMail, DocumentDetailsAPI, ApplicationDetailsAPI
from disburstment.views import DisbursementAPI, DisbursementDetailsAPI
from loan_sanctioning.views import LoanAPI, LoanDetailsAPI
from rest_framework_simplejwt.views import token_refresh, token_obtain_pair

router = DefaultRouter()
router.register("userview",UserView, basename="userview")
router.register("familyview", FamilyView, basename="familyview")
router.register("bankview", BankView, "bankView")
router.register("enquiryview", EnquiryView, "enquiryview")

urlpatterns = [
    path('admin/', admin.site.urls),
    path("access/", token_obtain_pair),
    path("token/", token_refresh),
    path("", include(router.urls)),
    path("application/", ApplicationAPI.as_view(), name="application"),
    path("application_details/<int:pk>/", ApplicationDetailsAPI.as_view(), name="application_details"),
    path("guarantor/", GuarantorAPI.as_view(), name="guarantor"),
    path("document/", DocumentAPI.as_view(), name="document"),
    path("application_document_details/<int:pk>/", DocumentDetailsAPI.as_view(), name="application_document_details" ),
    path("application_regarding_mail/", ApplicationRegrdingMail.as_view(), name="application_regarding_mail"),
    path("disbursement/", DisbursementAPI.as_view(), name="disbursement"),
    path("disbursement_details/<int:pk>/", DisbursementDetailsAPI.as_view(), name="disbursement_details"),
    path("loan/", LoanAPI.as_view(), name="loan"),
    path("loan_details/<int:pk>/", LoanDetailsAPI.as_view(), name="loan_details")

]
