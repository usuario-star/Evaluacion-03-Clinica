import React, { useState, useEffect } from 'react';
import { getMedicos, getEspecialidades } from '../services/api';
import { TarjetaMedico } from '../components/TarjetaMedico';
import { FiltroEspecialidad } from '../components/FiltroEspecialidad';
import './PaginaMedicos.css';

export const PaginaMedicos = () => {
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarDatosIniciales = async () => {
      try {
        const [espData, medData] = await Promise.all([
          getEspecialidades(),
          getMedicos()
        ]);
        setEspecialidades(espData);
        setMedicos(medData);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };
    cargarDatosIniciales();
  }, []);

  const handleCambioEspecialidad = async (e) => {
    const espId = e.target.value;
    setEspecialidadSeleccionada(espId);
    setCargando(true);
    try {
      const data = await getMedicos(espId || null);
      setMedicos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="pagina-medicos">
      <h2 className="section-title">Staff Médico Especializado</h2>
      <p className="section-description">
        Consulte la disponibilidad de nuestro cuerpo médico filtrando por su especialidad.
      </p>

      <FiltroEspecialidad
        especialidades={especialidades}
        especialidadSeleccionada={especialidadSeleccionada}
        onChange={handleCambioEspecialidad}
        totalMostrados={medicos.length}
      />

      {cargando ? (
        <div className="loading-spinner">Cargando médicos...</div>
      ) : medicos.length === 0 ? (
        <div className="no-data">No se encontraron médicos para la especialidad seleccionada.</div>
      ) : (
        <div className="medicos-grid">
          {medicos.map(medico => (
            <TarjetaMedico
              key={medico.id}
              nombres={medico.nombres}
              cmp={medico.cmp}
              especialidad={medico.especialidad_nombre || 'Especialista'}
              telefono={medico.telefono}
              correo={medico.correo}
            />
          ))}
        </div>
      )}
    </div>
  );
};
