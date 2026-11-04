const BASE_URL = 'http://localhost:8000/api';

export const getEspecialidades = async () => {
  const res = await fetch(`${BASE_URL}/especialidades/`);
  if (!res.ok) throw new Error('Error al obtener especialidades');
  return res.json();
};

export const getMedicos = async (especialidadId = null) => {
  const url = especialidadId 
    ? `${BASE_URL}/medicos/?especialidad=${especialidadId}`
    : `${BASE_URL}/medicos/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener médicos');
  return res.json();
};

export const getPacientes = async () => {
  const res = await fetch(`${BASE_URL}/pacientes/`);
  if (!res.ok) throw new Error('Error al obtener pacientes');
  return res.json();
};

export const crearPaciente = async (pacienteData) => {
  const res = await fetch(`${BASE_URL}/pacientes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pacienteData),
  });
  const data = await res.json();
  if (!res.ok) {
    const errorMsg = data.dni ? `DNI: ${data.dni[0]}` : Object.values(data).flat().join(', ');
    throw new Error(errorMsg || 'Error al registrar paciente');
  }
  return data;
};

export const eliminarPaciente = async (id) => {
  const res = await fetch(`${BASE_URL}/pacientes/${id}/`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Error al eliminar paciente');
  return true;
};

export const getCitas = async (fecha = null) => {
  const url = fecha ? `${BASE_URL}/citas/?fecha=${fecha}` : `${BASE_URL}/citas/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Error al obtener citas');
  return res.json();
};

export const crearCita = async (citaData) => {
  const res = await fetch(`${BASE_URL}/citas/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(citaData),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = data.hora?.[0] || data.fecha?.[0] || data.non_field_errors?.[0] || JSON.stringify(data);
    throw new Error(msg);
  }
  return data;
};

export const actualizarEstadoCita = async (id, estadoId) => {
  const res = await fetch(`${BASE_URL}/citas/${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ estado: estadoId }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error('Error al actualizar estado de la cita');
  return data;
};

export const getEstadosCita = async () => {
  const res = await fetch(`${BASE_URL}/estados-cita/`);
  if (!res.ok) throw new Error('Error al obtener estados');
  return res.json();
};
