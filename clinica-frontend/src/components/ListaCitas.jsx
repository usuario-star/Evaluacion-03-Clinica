import React from 'react';
import { ItemCita } from './ItemCita';

export const ListaCitas = ({ citas, idSeleccionado, onSeleccionar }) => {
  if (citas.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', background: 'white', borderRadius: '10px', color: '#64748b' }}>
        No hay citas programadas para la fecha seleccionada.
      </div>
    );
  }

  return (
    <div className="lista-citas-wrapper">
      {citas.map((cita) => (
        <ItemCita
          key={cita.id}
          cita={cita}
          esSeleccionada={cita.id === idSeleccionado}
          onSeleccionar={onSeleccionar}
        />
      ))}
    </div>
  );
};
