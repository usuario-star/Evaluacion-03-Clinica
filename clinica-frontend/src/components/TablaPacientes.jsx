import React from 'react';
import { Boton } from './Boton';
import './TablaPacientes.css';

export const TablaPacientes = ({ pacientes, onEliminar }) => {
  if (pacientes.length === 0) {
    return <div className="tabla-vacia">No se encontraron pacientes registrados con ese criterio.</div>;
  }

  const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Está seguro de eliminar al paciente ${nombre}? Se borrarán también sus citas asociadas.`)) {
      onEliminar(id);
    }
  };

  return (
    <div className="tabla-responsive">
      <table className="tabla-pacientes">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombres Completos</th>
            <th>Fecha Nac.</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th style={{ textAlign: 'center' }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.id}>
              <td><span className="dni-tag">{p.dni}</span></td>
              <td className="nombre-paciente">{p.nombres}</td>
              <td>{p.fecha_nacimiento}</td>
              <td>{p.telefono}</td>
              <td>{p.correo}</td>
              <td style={{ textAlign: 'center' }}>
                <Boton
                  variante="danger"
                  onClick={() => handleEliminar(p.id, p.nombres)}
                >
                  Eliminar
                </Boton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
