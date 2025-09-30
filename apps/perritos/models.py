from django.db import models

class Perritos(models.Model):
    imagen = models.URLField(help_text="URL del perrito")
    titulo = models.CharField(max_length=200)
    resumen = models.CharField(max_length=200)
    descripcion = models.TextField(blank=True, null=True)    
    link_detalle = models.URLField(help_text="URL del detalle")

    def __str__(self):
        return f"{self.titulo}"
