from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from django.utils import timezone
import datetime
from .models import Especialidad, Medico, Paciente, EstadoCita, Cita, HistoriaClinica


class EspecialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Especialidad
        fields = '__all__'


class MedicoSerializer(serializers.ModelSerializer):
    especialidad_nombre = serializers.CharField(source='especialidad.nombre', read_only=True)

    class Meta:
        model = Medico
        fields = '__all__'


class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'


class EstadoCitaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoCita
        fields = '__all__'


class HistoriaClinicaSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.nombres', read_only=True)

    class Meta:
        model = HistoriaClinica
        fields = '__all__'


class CitaSerializer(serializers.ModelSerializer):
    paciente_nombre = serializers.CharField(source='paciente.nombres', read_only=True)
    medico_nombre = serializers.CharField(source='medico.nombres', read_only=True)
    especialidad = serializers.CharField(source='medico.especialidad.nombre', read_only=True)
    estado_nombre = serializers.CharField(source='estado.nombre', read_only=True)

    class Meta:
        model = Cita
        fields = [
            'id',
            'paciente',
            'medico',
            'fecha',
            'hora',
            'motivo',
            'estado',
            'paciente_nombre',
            'medico_nombre',
            'especialidad',
            'estado_nombre',
        ]

    def validate(self, data):
        instance = getattr(self, 'instance', None)
        fecha = data.get('fecha', getattr(instance, 'fecha', None))
        hora = data.get('hora', getattr(instance, 'hora', None))
        medico = data.get('medico', getattr(instance, 'medico', None))

        # Validación 1: Fecha y hora pasadas
        if fecha and hora:
            cita_datetime = datetime.datetime.combine(fecha, hora)
            now = timezone.localtime(timezone.now()).replace(tzinfo=None)

            if cita_datetime < now:
                raise serializers.ValidationError({
                    "fecha": "No se pueden registrar citas en una fecha u hora pasada."
                })

        # Validación 2: Horario ocupado para el médico
        if medico and fecha and hora:
            qs = Cita.objects.filter(medico=medico, fecha=fecha, hora=hora)
            if instance:
                qs = qs.exclude(pk=instance.pk)
            qs = qs.exclude(estado__nombre__iexact="cancelada")

            if qs.exists():
                raise serializers.ValidationError({
                    "hora": f"El Dr(a). {medico.nombres} ya tiene una cita reservada para la fecha {fecha} a las {hora.strftime('%H:%M')}."
                })

        return data
