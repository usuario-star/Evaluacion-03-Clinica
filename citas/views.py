from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Especialidad, Medico, Paciente, EstadoCita, Cita, HistoriaClinica
from .serializers import (
    EspecialidadSerializer,
    MedicoSerializer,
    PacienteSerializer,
    EstadoCitaSerializer,
    CitaSerializer,
    HistoriaClinicaSerializer
)


class EspecialidadViewSet(viewsets.ModelViewSet):
    queryset = Especialidad.objects.all()
    serializer_class = EspecialidadSerializer


class MedicoViewSet(viewsets.ModelViewSet):
    queryset = Medico.objects.select_related('especialidad').all()
    serializer_class = MedicoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['especialidad']
    search_fields = ['nombres', 'cmp']


class PacienteViewSet(viewsets.ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['dni', 'nombres']


class EstadoCitaViewSet(viewsets.ModelViewSet):
    queryset = EstadoCita.objects.all()
    serializer_class = EstadoCitaSerializer


class CitaViewSet(viewsets.ModelViewSet):
    queryset = Cita.objects.select_related('paciente', 'medico', 'medico__especialidad', 'estado').all()
    serializer_class = CitaSerializer
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['fecha', 'medico', 'paciente', 'estado']
    ordering_fields = ['fecha', 'hora']
    ordering = ['fecha', 'hora']


class HistoriaClinicaViewSet(viewsets.ModelViewSet):
    queryset = HistoriaClinica.objects.select_related('paciente').all()
    serializer_class = HistoriaClinicaSerializer
