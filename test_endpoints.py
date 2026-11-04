import os
import django
from datetime import date, time, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'clinica.settings')
django.setup()

from rest_framework.test import APIClient
from citas.models import Medico, Paciente, EstadoCita, Cita

client = APIClient()

print("--- 1. PROBANDO GET /api/especialidades/ ---")
r = client.get('/api/especialidades/')
print(f"Status: {r.status_code}, Total especialidades: {len(r.data)}")

print("\n--- 2. PROBANDO GET /api/medicos/ (y filtro por especialidad) ---")
r = client.get('/api/medicos/')
print(f"Status: {r.status_code}, Total médicos: {len(r.data)}")
r_filter = client.get('/api/medicos/?especialidad=1')
print(f"Status filtro ?especialidad=1: {r_filter.status_code}, Registros: {len(r_filter.data)}")

print("\n--- 3. PROBANDO GET /api/pacientes/ ---")
r = client.get('/api/pacientes/')
print(f"Status: {r.status_code}, Total pacientes: {len(r.data)}")

print("\n--- 4. PROBANDO GET /api/citas/ (y filtro por fecha) ---")
mañana = date.today() + timedelta(days=2)
r = client.get('/api/citas/')
print(f"Status: {r.status_code}, Total citas: {len(r.data)}")
print("Ejemplo de cita serializada con campos calculados:")
if r.data:
    item = r.data[0]
    print({
        "id": item["id"],
        "paciente_nombre": item["paciente_nombre"],
        "medico_nombre": item["medico_nombre"],
        "especialidad": item["especialidad"],
        "estado_nombre": item["estado_nombre"],
        "fecha": item["fecha"],
        "hora": item["hora"]
    })

r_fecha = client.get(f'/api/citas/?fecha={mañana.strftime("%Y-%m-%d")}')
print(f"Status filtro por fecha ({mañana}): {r_fecha.status_code}, Total: {len(r_fecha.data)}")

print("\n--- 5. PROBANDO VALIDACIÓN 400: FECHA PASADA ---")
paciente = Paciente.objects.first()
medico = Medico.objects.first()
estado = EstadoCita.objects.get(nombre='pendiente')

payload_pasada = {
    "paciente": paciente.id,
    "medico": medico.id,
    "fecha": "2020-01-01",
    "hora": "10:00:00",
    "motivo": "Consulta fuera de tiempo",
    "estado": estado.id
}
r_pasada = client.post('/api/citas/', payload_pasada, format='json')
print(f"Status: {r_pasada.status_code}")
print(f"Respuesta: {r_pasada.data}")

print("\n--- 6. PROBANDO VALIDACIÓN 400: HORARIO OCUPADO DEL MÉDICO ---")
# Usamos la cita existente cita1 (medico1, mañana, 09:00:00)
payload_ocupado = {
    "paciente": paciente.id,
    "medico": medico.id,
    "fecha": mañana.strftime("%Y-%m-%d"),
    "hora": "09:00:00",
    "motivo": "Intento de reservar en mismo horario",
    "estado": estado.id
}
r_ocupado = client.post('/api/citas/', payload_ocupado, format='json')
print(f"Status: {r_ocupado.status_code}")
print(f"Respuesta: {r_ocupado.data}")

print("\n--- 7. PROBANDO POST CITA EXITOSA (201 CREATED) ---")
payload_ok = {
    "paciente": paciente.id,
    "medico": medico.id,
    "fecha": (date.today() + timedelta(days=5)).strftime("%Y-%m-%d"),
    "hora": "11:00:00",
    "motivo": "Chequeo médico de rutina exitoso",
    "estado": estado.id
}
r_ok = client.post('/api/citas/', payload_ok, format='json')
print(f"Status: {r_ok.status_code}")
cita_creada_id = r_ok.data.get("id")
print(f"Cita creada ID: {cita_creada_id}, medico_nombre: {r_ok.data.get('medico_nombre')}")

print("\n--- 8. PROBANDO PATCH Y DELETE ---")
r_patch = client.patch(f'/api/citas/{cita_creada_id}/', {'motivo': 'Motivo actualizado vía PATCH'}, format='json')
print(f"Status PATCH: {r_patch.status_code}, Nuevo motivo: {r_patch.data.get('motivo')}")

r_del = client.delete(f'/api/citas/{cita_creada_id}/')
print(f"Status DELETE: {r_del.status_code}")
