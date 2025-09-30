from django import forms
from .models import Registro
from datetime import date

class RegistroForm(forms.ModelForm):
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={"class": "form-control"}),
        label="Confirmar contraseña"
    )

    class Meta:
        model = Registro
        fields = ["nombre_completo", "email", "password", "fecha_nacimiento", 
                  "celular", "telefono", "acepta_terminos"]
        widgets = {
            "nombre_completo": forms.TextInput(attrs={"class": "form-control"}),
            "email": forms.EmailInput(attrs={"class": "form-control"}),
            "password": forms.PasswordInput(attrs={"class": "form-control"}),
            "fecha_nacimiento": forms.DateInput(attrs={"type": "date", "class": "form-control"}),
            "celular": forms.TextInput(attrs={"class": "form-control"}),
            "telefono": forms.TextInput(attrs={"class": "form-control"}),
            "acepta_terminos": forms.CheckboxInput(attrs={"class": "form-check-input"}),
        }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        confirm_password = cleaned_data.get("confirm_password")
        fecha_nacimiento = cleaned_data.get("fecha_nacimiento")

        # Confirmar contraseñas
        if password and confirm_password and password != confirm_password:
            self.add_error("confirm_password", "Las contraseñas no coinciden.")

        # Validar edad mínima
        if fecha_nacimiento:
            hoy = date.today()
            edad = hoy.year - fecha_nacimiento.year - (
                (hoy.month, hoy.day) < (fecha_nacimiento.month, fecha_nacimiento.day)
            )
            if edad < 18:
                self.add_error("fecha_nacimiento", "Debes ser mayor de 18 años.")

        return cleaned_data