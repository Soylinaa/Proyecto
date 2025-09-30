from django.urls import path
from .views import registro_view

urlpatterns = [
    path("", registro_view, name="registro"),
]