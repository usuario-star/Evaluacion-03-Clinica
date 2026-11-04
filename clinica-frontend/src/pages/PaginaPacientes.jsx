import React, { useState, useEffect } from 'react';
import { getPacientes, crearPaciente, eliminarPaciente } from '../services/api';
import { FormularioPaciente } from '../components/FormularioPaciente';
import { TablaPacientes } from '../components/TablaPacientes';
import { BuscadorPacientes } from '../components/BuscadorPacientes';
import './PaginaPacientes.css';

export const PaginaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarPacientes = async () => {
    try {
      const data = await getPacientes();
      setPacientes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPacientes();
  }, []);

  const handlePacienteCreado = async (nuevoPaciente) => {
    const pacienteGuardado = await crearPaciente(nuevoPaciente);
    setPacientes(prev => [pacienteGuardado, ...prev]);
  };

  const handleEliminarPaciente = async (id) => {
    try {
      await eliminarPaciente(id);
      setPacientes(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      alert('Error al eliminar paciente: ' + err.message);
    }
  };

  const pacientesFiltrados = pacientes.filter(p => {
    const termino = busqueda.toLowerCase().trim();
    return p.nombres.toLowerCase().includes(termino) || p.dni.includes(termino);
  });

  return (
    <div className="pagina-pacientes">
      <h2 className="section-title">Gestión de Pacientes</h2>
      <p className="section-description">
        Registre nuevos pacientes en el sistema y administre el directorio existente.
      </p>

      <div className="pacientes-layout">
        <div className="pacientes-form-col">
          <FormularioPaciente onPacienteCreado={handlePacienteCreado} />
        </div>

        <div className="pacientes-lista-col">
          <BuscadorPacientes
            valor={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onLimpiar={() => setBusqueda('')}
          />

          {cargando ? (
            <div className="loading-spinner">Cargando pacientes...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <TablaPacientes
              pacientes={pacientesFiltrados}
              onEliminar={handleEliminarPaciente}
            />
          )}
        </div>
      </div>
    </div>
  );
};
