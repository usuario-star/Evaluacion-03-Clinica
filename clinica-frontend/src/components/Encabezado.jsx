import React, { useContext } from 'react';
import { ClinicaContext } from '../context/ClinicaContext';
import './Encabezado.css';

export const Encabezado = () => {
  const { recepcionista, fechaTrabajo } = useContext(ClinicaContext);
  const fechaHoyTexto = new Date().toLocaleDateString('es-PE', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="clinica-header">
      <div className="header-logo-container">
        <div className="header-icon">🏥</div>
        <div>
          <h1 className="header-title">Clínica San Gabriel</h1>
          <p className="header-subtitle">Sistema Integral de Citas Médicas</p>
        </div>
      </div>
      <div className="header-meta">
        <div className="meta-item">
          <span className="meta-label">📅 Fecha de hoy:</span>
          <span className="meta-value">{fechaHoyTexto}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">👤 Usuario activo:</span>
          <span className="meta-value user-badge">{recepcionista}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">📌 Fecha seleccionada:</span>
          <span className="meta-value date-badge">{fechaTrabajo}</span>
        </div>
      </div>
    </header>
  );
};
