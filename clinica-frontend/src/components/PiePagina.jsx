import React from 'react';
import './PiePagina.css';

export const PiePagina = () => {
  const anio = new Date().getFullYear();

  return (
    <footer className="clinica-footer">
      <div className="footer-content">
        <p>© {anio} Clínica San Gabriel S.A.C. - Sistema de Gestión Hospitalaria</p>
        <p className="footer-subtext">Diseñado para la Evaluación 03 - Tecsup | Django REST Framework + React</p>
      </div>
    </footer>
  );
};
