from django.shortcuts import render
from .models import Fyp

def fyp(request):
    fyp_list = Fyp.objects.all().order_by('-creado')
    return render(request, "pages/fyp.html", {"fyp_list": fyp_list})
