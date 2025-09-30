from django.contrib import admin
from .models import Registro

@admin.register(Registro)
class RegistroAdmin(admin.ModelAdmin):
    list_display = ("nombre_completo", "email", "celular", "acepta_terminos", "creado_en")
    search_fields = ("nombre_completo", "email", "celular")
