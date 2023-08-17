from django.urls import path
from .views import FamilyAPI, EMICalculatorView,  ApplicationInstallmentView, MarkAsDefaulterView

urlpatterns = [
    path('emicalci/',EMICalculatorView.as_view(), name='emi_calci'),
    path('family/', FamilyAPI.as_view(), name='api_family'),
    path('appli_installment/<id>/', ApplicationInstallmentView.as_view(), name="api_installment"),
    path('mark_as_defaulter/<int:id>/', MarkAsDefaulterView.as_view(), name='mark_as_defaulter'),
    #path('appli_installment/<int:id>/mark_as_defaulter/', AddApplicantToDefaulter.as_view(), name='mark_as_defaulter'),
]