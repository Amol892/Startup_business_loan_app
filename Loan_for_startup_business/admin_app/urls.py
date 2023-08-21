from django.urls import path
from .views import FamilyAPI, EMICalculatorView,  ApplicationInstallmentView, MarkAsDefaulterView, DefaulterList

urlpatterns = [
    path('emicalci/',EMICalculatorView.as_view(), name='emi_calci'),
    path('family/', FamilyAPI.as_view(), name='api_family'),
    path('appli_installment/<id>/', ApplicationInstallmentView.as_view(), name="api_installment"),
    path('mark_as_defaulter/<int:id>/', MarkAsDefaulterView.as_view(), name='mark_as_defaulter'),
    path('defaulters/', DefaulterList.as_view(), name='defaulter-list'),
]