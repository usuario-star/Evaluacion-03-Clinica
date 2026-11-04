import React from 'react';
import { Boton } from './Boton';
import './DetalleCita.css';

export const DetalleCita = ({ cita, estados, onCambiarEstado }) => {
  if (!cita) {
    return (
      <div className="detalle-cita-placeholder">
        <span className="placeholder-icon">📋</span>
        <p>Seleccione una cita de la lista para ver su detalle completo y gestionar su estado.</p>
      </div>
    );
  }

  // Comprobar si el estado actual es final
  const estadoObj = estados.find(e => e.id === cita.estado || e.nombre?.toLowerCase() === cita.estado_nombre?.toLowerCase());
  const esEstadoFinal = estadoObj?.es_final || ['atendida', 'cancelada'].includes(cita.estado_nombre?.toLowerCase());

  // IDs de estados esperados
  const estadoConfirmadaId = estados.find(e => e.nombre?.toLowerCase() === 'confirmada')?.id || 2;
  const estadoAtendidaId = estados.find(e => e.nombre?.toLowerCase() === 'atendida')?.id || 3;
  const estadoCanceladaId = estados.find(e => e.nombre?.toLowerCase() === 'cancelada')?.id || 4;

  return (
    <div className="detalle-cita-card">
      <div className="detalle-header">
        <h3 className="detalle-title">Detalle de la Cita #{cita.id}</h3>
        <span className={`estado-tag estado-${cita.estado_nombre?.toLowerCase()}`}>
          {cita.estado_nombre}
        </span>
      </div>

      <div className="detalle-info-grid">
        <div className="info-block">
          <span className="info-label">👤 Paciente</span>
          <span className="info-value">{cita.paciente_nombre}</span>
        </div>
        <div className="info-block">
          <span className="info-label">🩺 Médico</span>
          <span className="info-value">{cita.medico_nombre}</span>
        </div>
        <div className="info-block">
          <span className="info-label">🏥 Especialidad</span>
          <span className="info-value">{cita.especialidad}</span>
        </div>
        <div className="info-block">
          <span className="info-label">📅 Fecha y Hora</span>
          <span className="info-value">{cita.fecha} — {cita.hora ? cita.hora.substring(0, 5) : ''}</span>
        </div>
      </div>

      <div className="info-motivo">
        <span className="info-label">📝 Motivo de consulta</span>
        <p className="motivo-texto">{cita.motivo}</p>
      </div>

      {esEstadoFinal && (
        <div className="alerta-estado-final">
          ⚠️ Esta cita se encuentra en un estado final (<strong>{cita.estado_nombre}</strong>). Las acciones se encuentran deshabilitadas.
        </div>
      )}

      <div className="detalle-acciones">
        <Boton
          variante="primary"
          onClick={() => onCambiarEstado(cita.id, estadoConfirmadaId)}
          disabled={esEstadoFinal || cita.estado_nombre?.toLowerCase() === 'confirmada'}
        >
          Confirmar
        </Boton>
        <Boton
          variante="success"
          onClick={() => onCambiarEstado(cita.id, estadoAtendidaId)}
          disabled={esEstadoFinal}
        >
          Marcar como Atendida
        </Boton>
        <Boton
          variante="danger"
          onClick={() => onCambiarEstado(cita.id, estadoCanceladaId)}
          disabled={esEstadoFinal}
        >
          Cancelar Cita
        </Boton>
      </div>
    </div>
  );
};
