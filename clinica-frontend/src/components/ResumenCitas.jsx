import React from 'react';
import './ResumenCitas.css';

export const ResumenCitas = ({ citas }) => {
  const conteo = {
    total: citas.length,
    pendiente: citas.filter(c => c.estado_nombre?.toLowerCase() === 'pendiente').length,
    confirmada: citas.filter(c => c.estado_nombre?.toLowerCase() === 'confirmada').length,
    atendida: citas.filter(c => c.estado_nombre?.toLowerCase() === 'atendida').length,
    cancelada: citas.filter(c => c.estado_nombre?.toLowerCase() === 'cancelada').length,
  };

  return (
    <div className="resumen-citas-bar">
      <div className="resumen-card total">
        <span className="resumen-numero">{conteo.total}</span>
        <span className="resumen-texto">Total Citas</span>
      </div>
      <div className="resumen-card pendiente">
        <span className="resumen-numero">{conteo.pendiente}</span>
        <span className="resumen-texto">Pendientes</span>
      </div>
      <div className="resumen-card confirmada">
        <span className="resumen-numero">{conteo.confirmada}</span>
        <span className="resumen-texto">Confirmadas</span>
      </div>
      <div className="resumen-card atendida">
        <span className="resumen-numero">{conteo.atendida}</span>
        <span className="resumen-texto">Atendidas</span>
      </div>
      <div className="resumen-card cancelada">
        <span className="resumen-numero">{conteo.cancelada}</span>
        <span className="resumen-texto">Canceladas</span>
      </div>
    </div>
  );
};
