import React from 'react';
import './TarjetaMedico.css';

export const TarjetaMedico = ({
  nombres,
  cmp,
  especialidad,
  telefono,
  correo,
  foto = 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&auto=format&fit=crop&q=60'
}) => {
  return (
    <div className="tarjeta-medico">
      <div className="tarjeta-img-wrapper">
        <img src={foto} alt={nombres} className="tarjeta-img" />
        <span className="tarjeta-badge">{especialidad}</span>
      </div>
      <div className="tarjeta-cuerpo">
        <h4 className="tarjeta-nombre">Dr(a). {nombres}</h4>
        <p className="tarjeta-cmp"><strong>CMP:</strong> {cmp}</p>
        <div className="tarjeta-contacto">
          <p>📞 {telefono}</p>
          <p>✉️ {correo}</p>
        </div>
      </div>
    </div>
  );
};
