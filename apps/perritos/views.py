from django.shortcuts import render
from .models import Perritos

def perritos(request):
    perros = Perritos.objects.all()
    return render(request, "pages/perritos.html", {"perros": perros})