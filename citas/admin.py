from django.contrib import admin
from .models import Especialidad, Medico, Paciente, EstadoCita, Cita, HistoriaClinica

@admin.register(Especialidad)
class EspecialidadAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'descripcion')
    search_fields = ('nombre',)

@admin.register(Medico)
class MedicoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombres', 'cmp', 'especialidad', 'telefono', 'correo')
    list_filter = ('especialidad',)
    search_fields = ('nombres', 'cmp')

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ('id', 'dni', 'nombres', 'fecha_nacimiento', 'telefono', 'correo')
    search_fields = ('dni', 'nombres')

@admin.register(EstadoCita)
class EstadoCitaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'es_final')

@admin.register(Cita)
class CitaAdmin(admin.ModelAdmin):
    list_display = ('id', 'paciente', 'medico', 'fecha', 'hora', 'estado')
    list_filter = ('fecha', 'estado', 'medico__especialidad')
    search_fields = ('paciente__nombres', 'medico__nombres')

@admin.register(HistoriaClinica)
class HistoriaClinicaAdmin(admin.ModelAdmin):
    list_display = ('id', 'paciente', 'grupo_sanguineo')
    search_fields = ('paciente__nombres', 'paciente__dni')
