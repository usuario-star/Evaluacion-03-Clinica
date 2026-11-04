import os
import django
from datetime import date, time, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'clinica.settings')
django.setup()

from django.contrib.auth.models import User
from citas.models import Especialidad, Medico, Paciente, EstadoCita, Cita, HistoriaClinica

# 1. Superusuario
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@clinicasangabriel.com', 'admin123')
    print("Superusuario 'admin' creado exitosamente (clave: admin123).")

# 2. Estados de Cita
estados_data = [
    ('pendiente', False),
    ('confirmada', False),
    ('atendida', True),
    ('cancelada', True),
]
for nombre, es_final in estados_data:
    EstadoCita.objects.get_or_create(nombre=nombre, defaults={'es_final': es_final})
print("Estados de cita creados/verificados.")

# 3. Especialidades (al menos 3)
especialidades_data = [
    ("Cardiología", "Diagnóstico y tratamiento de enfermedades del corazón y vasos sanguíneos."),
    ("Pediatría", "Atención médica integral para bebés, niños y adolescentes."),
    ("Dermatología", "Cuidado, prevención y tratamiento de enfermedades de la piel."),
    ("Traumatología", "Tratamiento de lesiones del aparato locomotor."),
]
especialidades_objs = {}
for nom, desc in especialidades_data:
    obj, _ = Especialidad.objects.get_or_create(nombre=nom, defaults={'descripcion': desc})
    especialidades_objs[nom] = obj
print("Especialidades creadas.")

# 4. Médicos (al menos 4)
medicos_data = [
    ("Carlos Mendoza Salazar", "CMP45123", "Cardiología", "987654321", "cmendoza@clinicasangabriel.com"),
    ("Valeria Rojas Paredes", "CMP58941", "Pediatría", "981234567", "vrojas@clinicasangabriel.com"),
    ("Fernando Alarcón Vega", "CMP63214", "Dermatología", "975312468", "falarcon@clinicasangabriel.com"),
    ("Lucía Torres Benítez", "CMP71052", "Traumatología", "964213579", "ltorres@clinicasangabriel.com"),
]
medicos_objs = []
for nom, cmp_val, esp_nom, telf, email in medicos_data:
    obj, _ = Medico.objects.get_or_create(
        cmp=cmp_val,
        defaults={
            'nombres': nom,
            'especialidad': especialidades_objs[esp_nom],
            'telefono': telf,
            'correo': email
        }
    )
    medicos_objs.append(obj)
print("Médicos creados.")

# 5. Pacientes (al menos 5)
pacientes_data = [
    ("74859612", "Juan Pérez Gómez", date(1992, 5, 14), "912345678", "juan.perez@gmail.com", "O+", "Ninguna", "Hipertensión leve"),
    ("71234567", "María Elena Quispe", date(1988, 11, 20), "923456789", "mquispe@hotmail.com", "A+", "Penicilina", "Asma en la infancia"),
    ("75647382", "Luis Alberto Ramírez", date(2001, 3, 8), "934567890", "lramirez@outlook.com", "B+", "Sulfas", "Sin antecedentes de relevancia"),
    ("70123987", "Ana Sofía Morales", date(1996, 7, 25), "945678901", "amorales@gmail.com", "O-", "Ninguna", "Cirugía de apéndice (2018)"),
    ("78965412", "Diego Alonso Castro", date(2015, 9, 12), "956789012", "dcastro_tutor@gmail.com", "AB+", "Ibuprofeno", "Rinitis alérgica"),
]
pacientes_objs = []
for dni_val, nom, fnac, telf, email, gs, alerg, antec in pacientes_data:
    pac, _ = Paciente.objects.get_or_create(
        dni=dni_val,
        defaults={
            'nombres': nom,
            'fecha_nacimiento': fnac,
            'telefono': telf,
            'correo': email
        }
    )
    pacientes_objs.append(pac)
    HistoriaClinica.objects.get_or_create(
        paciente=pac,
        defaults={
            'grupo_sanguineo': gs,
            'alergias': alerg,
            'antecedentes': antec
        }
    )
print("Pacientes e Historias Clínicas creadas.")

# 6. Citas de prueba (fechas futuras)
mañana = date.today() + timedelta(days=2)
estado_pendiente = EstadoCita.objects.get(nombre='pendiente')
estado_confirmada = EstadoCita.objects.get(nombre='confirmada')

cita1, _ = Cita.objects.get_or_create(
    medico=medicos_objs[0],
    fecha=mañana,
    hora=time(9, 0),
    defaults={
        'paciente': pacientes_objs[0],
        'motivo': "Evaluación de dolor torácico y control de presión",
        'estado': estado_pendiente
    }
)

cita2, _ = Cita.objects.get_or_create(
    medico=medicos_objs[1],
    fecha=mañana,
    hora=time(10, 30),
    defaults={
        'paciente': pacientes_objs[4],
        'motivo': "Control pediátrico de rutina y vacunación",
        'estado': estado_confirmada
    }
)
print("Citas creadas exitosamente.")
