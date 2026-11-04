import React from 'react';
import { Boton } from './Boton';
import './ItemCita.css';

export const ItemCita = ({ cita, onSeleccionar, esSeleccionada }) => {
  const getBadgeClass = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'confirmada': return 'badge-confirmada';
      case 'atendida': return 'badge-atendida';
      case 'cancelada': return 'badge-cancelada';
      default: return 'badge-pendiente';
    }
  };

  return (
    <div className={`item-cita-card ${esSeleccionada ? 'seleccionada' : ''}`}>
      <div className="item-cita-hora">
        <span className="hora-texto">{cita.hora ? cita.hora.substring(0, 5) : ''}</span>
        <span className="fecha-texto">{cita.fecha}</span>
      </div>
      <div className="item-cita-info">
        <h4 className="item-paciente">{cita.paciente_nombre}</h4>
        <p className="item-medico">🩺 {cita.medico_nombre} ({cita.especialidad})</p>
        <span className={`estado-pill ${getBadgeClass(cita.estado_nombre)}`}>
          {cita.estado_nombre}
        </span>
      </div>
      <div className="item-cita-accion">
        <Boton
          variante={esSeleccionada ? 'primary' : 'outline'}
          onClick={() => onSeleccionar(cita.id)}
        >
          {esSeleccionada ? 'Viendo' : 'Ver detalle'}
        </Boton>
      </div>
    </div>
  );
};
