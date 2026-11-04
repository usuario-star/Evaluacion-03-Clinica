import React from 'react';
import './FiltroEspecialidad.css';

export const FiltroEspecialidad = ({ especialidades, especialidadSeleccionada, onChange, totalMostrados }) => {
  return (
    <div className="filtro-especialidad-bar">
      <div className="filtro-control">
        <label htmlFor="select-esp">Filtrar por Especialidad Médica:</label>
        <select
          id="select-esp"
          value={especialidadSeleccionada}
          onChange={onChange}
          className="select-filtro"
        >
          <option value="">-- Todas las especialidades --</option>
          {especialidades.map((esp) => (
            <option key={esp.id} value={esp.id}>
              {esp.nombre}
            </option>
          ))}
        </select>
      </div>
      <div className="contador-medicos">
        Médicos disponibles: <strong>{totalMostrados}</strong>
      </div>
    </div>
  );
};
