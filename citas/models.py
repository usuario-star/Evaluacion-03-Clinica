from django.db import models
from django.core.validators import RegexValidator


class Especialidad(models.Model):
    nombre = models.CharField(max_length=100, unique=True, verbose_name="Nombre")
    descripcion = models.TextField(blank=True, verbose_name="Descripción")

    class Meta:
        verbose_name = "Especialidad"
        verbose_name_plural = "Especialidades"

    def __str__(self):
        return self.nombre


class Medico(models.Model):
    nombres = models.CharField(max_length=150, verbose_name="Nombres completos")
    cmp = models.CharField(max_length=20, unique=True, verbose_name="Número CMP")
    especialidad = models.ForeignKey(
        Especialidad,
        on_delete=models.PROTECT,
        related_name="medicos",
        verbose_name="Especialidad"
    )
    telefono = models.CharField(max_length=20, verbose_name="Teléfono")
    correo = models.EmailField(verbose_name="Correo electrónico")

    class Meta:
        verbose_name = "Médico"
        verbose_name_plural = "Médicos"

    def __str__(self):
        return f"Dr(a). {self.nombres} (CMP: {self.cmp})"


class Paciente(models.Model):
    dni = models.CharField(
        max_length=8,
        unique=True,
        validators=[RegexValidator(r'^\d{8}$', 'El DNI debe tener exactamente 8 dígitos')],
        verbose_name="DNI"
    )
    nombres = models.CharField(max_length=150, verbose_name="Nombres completos")
    fecha_nacimiento = models.DateField(verbose_name="Fecha de nacimiento")
    telefono = models.CharField(max_length=20, verbose_name="Teléfono")
    correo = models.EmailField(verbose_name="Correo electrónico")

    class Meta:
        verbose_name = "Paciente"
        verbose_name_plural = "Pacientes"

    def __str__(self):
        return f"{self.nombres} (DNI: {self.dni})"


class EstadoCita(models.Model):
    nombre = models.CharField(max_length=50, unique=True, verbose_name="Nombre")
    es_final = models.BooleanField(default=False, verbose_name="¿Es estado final?")

    class Meta:
        verbose_name = "Estado de Cita"
        verbose_name_plural = "Estados de Citas"

    def __str__(self):
        return self.nombre


class Cita(models.Model):
    paciente = models.ForeignKey(
        Paciente,
        on_delete=models.CASCADE,
        related_name="citas",
        verbose_name="Paciente"
    )
    medico = models.ForeignKey(
        Medico,
        on_delete=models.PROTECT,
        related_name="citas",
        verbose_name="Médico"
    )
    fecha = models.DateField(verbose_name="Fecha")
    hora = models.TimeField(verbose_name="Hora")
    motivo = models.TextField(verbose_name="Motivo de la cita")
    estado = models.ForeignKey(
        EstadoCita,
        on_delete=models.PROTECT,
        related_name="citas",
        verbose_name="Estado"
    )

    class Meta:
        verbose_name = "Cita"
        verbose_name_plural = "Citas"
        constraints = [
            models.UniqueConstraint(
                fields=['medico', 'fecha', 'hora'],
                name='unique_cita_medico_fecha_hora'
            )
        ]

    def __str__(self):
        return f"Cita #{self.id} - {self.paciente.nombres} con {self.medico.nombres} el {self.fecha} {self.hora}"


class HistoriaClinica(models.Model):
    paciente = models.OneToOneField(
        Paciente,
        on_delete=models.CASCADE,
        related_name="historia_clinica",
        verbose_name="Paciente"
    )
    grupo_sanguineo = models.CharField(max_length=10, verbose_name="Grupo sanguíneo")
    alergias = models.TextField(blank=True, verbose_name="Alergias")
    antecedentes = models.TextField(blank=True, verbose_name="Antecedentes médicos")

    class Meta:
        verbose_name = "Historia Clínica"
        verbose_name_plural = "Historias Clínicas"

    def __str__(self):
        return f"Historia Clínica de {self.paciente.nombres}"
