from django.db import models

class Fyp(models.Model):
    pregunta = models.CharField(max_length=200)
    respuesta = models.TextField()
    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.pregunta
