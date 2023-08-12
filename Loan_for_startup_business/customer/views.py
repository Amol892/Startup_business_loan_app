from django.shortcuts import render
from .models import Enquiry
from .serializers import EnquiryModelSerializer
from rest_framework.viewsets import ModelViewSet

# Create your views here.
class EnquiryView(ModelViewSet):
    serializer_class = EnquiryModelSerializer
    queryset = Enquiry.objects.all()
