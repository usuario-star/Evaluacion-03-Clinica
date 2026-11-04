import React from 'react';
import { Boton } from './Boton';
import './BuscadorPacientes.css';

export const BuscadorPacientes = ({ valor, onChange, onLimpiar }) => {
  return (
    <div className="buscador-pacientes-container">
      <div className="buscador-input-wrapper">
        <span className="buscador-icon">🔍</span>
        <input
          type="text"
          className="buscador-input"
          placeholder="Buscar por DNI o nombres..."
          value={valor}
          onChange={onChange}
        />
      </div>
      {valor && (
        <Boton variante="secondary" onClick={onLimpiar}>
          Limpiar
        </Boton>
      )}
    </div>
  );
};
