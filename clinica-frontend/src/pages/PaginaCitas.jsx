import React, { useState, useEffect, useContext } from 'react';
import { ClinicaContext } from '../context/ClinicaContext';
import { getCitas, getMedicos, getPacientes, getEstadosCita, crearCita, actualizarEstadoCita } from '../services/api';
import { ResumenCitas } from '../components/ResumenCitas';
import { FormularioCita } from '../components/FormularioCita';
import { ListaCitas } from '../components/ListaCitas';
import { DetalleCita } from '../components/DetalleCita';
import './PaginaCitas.css';

export const PaginaCitas = () => {
  const { fechaTrabajo, setFechaTrabajo } = useContext(ClinicaContext);

  const [citas, setCitas] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [estados, setEstados] = useState([]);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const [citasData, medicosData, pacientesData, estadosData] = await Promise.all([
        getCitas(),
        getMedicos(),
        getPacientes(),
        getEstadosCita()
      ]);
      setCitas(citasData);
      setMedicos(medicosData);
      setPacientes(pacientesData);
      setEstados(estadosData);
      if (citasData.length > 0 && !idSeleccionado) {
        setIdSeleccionado(citasData[0].id);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Callback hijo a padre: cuando FormularioCita crea una cita
  const handleCitaCreada = async (citaPayload) => {
    const citaGuardada = await crearCita(citaPayload);
    setCitas(prev => [citaGuardada, ...prev]);
    setIdSeleccionado(citaGuardada.id);
  };

  // Callback hijo a padre: cambiar estado desde DetalleCita
  const handleCambiarEstado = async (idCita, nuevoEstadoId) => {
    try {
      const citaActualizada = await actualizarEstadoCita(idCita, nuevoEstadoId);
      setCitas(prev => prev.map(c => (c.id === idCita ? citaActualizada : c)));
    } catch (err) {
      alert('Error al actualizar estado: ' + err.message);
    }
  };

  const citaSeleccionada = citas.find(c => c.id === idSeleccionado) || null;

  return (
    <div className="pagina-citas">
      <div className="citas-top-bar">
        <div>
          <h2 className="section-title">Recepción de Citas Médicas</h2>
          <p className="section-description">
            Agende, consulte y actualice en tiempo real los estados de atención médica.
          </p>
        </div>
        <div className="fecha-filtro-box">
          <label htmlFor="fecha-trabajo-input">Fecha operativa:</label>
          <input
            id="fecha-trabajo-input"
            type="date"
            value={fechaTrabajo}
            onChange={(e) => setFechaTrabajo(e.target.value)}
          />
        </div>
      </div>

      {/* Resumen de citas (KPIs automáticos por props) */}
      <ResumenCitas citas={citas} />

      {/* Formulario de reserva */}
      <FormularioCita
        medicos={medicos}
        pacientes={pacientes}
        onCitaCreada={handleCitaCreada}
      />

      {/* Panel dividido: Lista de Citas a la izquierda, Detalle a la derecha */}
      <div className="citas-split-panel">
        <div className="citas-lista-section">
          <h3 className="subseccion-title">Citas Programadas ({citas.length})</h3>
          {cargando ? (
            <div className="loading-spinner">Cargando citas...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <ListaCitas
              citas={citas}
              idSeleccionado={idSeleccionado}
              onSeleccionar={(id) => setIdSeleccionado(id)}
            />
          )}
        </div>

        <div className="citas-detalle-section">
          <h3 className="subseccion-title">Detalle y Gestión</h3>
          <DetalleCita
            cita={citaSeleccionada}
            estados={estados}
            onCambiarEstado={handleCambiarEstado}
          />
        </div>
      </div>
    </div>
  );
};
