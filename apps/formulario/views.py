from django.shortcuts import render, redirect
from .forms import RegistroForm

def registro_view(request):
    if request.method == "POST":
        form = RegistroForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("inicio")
        else:
            print(form.errors)
    else:
        form = RegistroForm()
    
    return render(request, "pages/formulario.html", {"form": form})