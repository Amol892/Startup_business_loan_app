
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from admin_app.views import UserView, FamilyView, BankView
from customer.views import EnquiryView
from application_generation.views import ApplicationAPI, GuarantorAPI, DocumentAPI
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
    path("guarantor/", GuarantorAPI.as_view(), name="guarantor"),
    path("document/", DocumentAPI.as_view(), name="document"),

]
