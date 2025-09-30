from django.db import models
from django.core.validators import RegexValidator, MinLengthValidator, EmailValidator

class Registro(models.Model):
    nombre_completo = models.CharField(
        max_length=150,
        validators=[MinLengthValidator(3, message="El nombre debe tener al menos 3 caracteres")]
    )
    email = models.EmailField(
        unique=True,
        validators=[EmailValidator(message="Correo electrónico no válido")]
    )
    password = models.CharField(
        max_length=128,  # En producción, lo recomendable es usar hashing
        validators=[MinLengthValidator(8, message="La contraseña debe tener mínimo 8 caracteres")]
    )
    fecha_nacimiento = models.DateField()
    celular = models.CharField(
        max_length=10,
        validators=[RegexValidator(
            regex=r"^3\d{9}$",
            message="El celular debe ser un número colombiano válido (10 dígitos, empieza con 3)"
        )]
    )
    telefono = models.CharField(
        max_length=15,
        blank=True, null=True,
        validators=[RegexValidator(
            regex=r"^\d{10,}$",
            message="El teléfono debe tener al menos 10 dígitos"
        )]
    )
    acepta_terminos = models.BooleanField(default=False)

    creado_en = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre_completo