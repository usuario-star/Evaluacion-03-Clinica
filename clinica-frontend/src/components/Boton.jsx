import React from 'react';
import './Boton.css';

export const Boton = ({ children, texto, variante = 'primary', onClick, type = 'button', disabled = false }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variante}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children || texto}
    </button>
  );
};
