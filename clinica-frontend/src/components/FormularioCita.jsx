import React, { useState, useContext } from 'react';
import { ClinicaContext } from '../context/ClinicaContext';
import { Boton } from './Boton';
import './FormularioCita.css';

export const FormularioCita = ({ medicos, pacientes, onCitaCreada }) => {
  const { fechaTrabajo } = useContext(ClinicaContext);

  const [formData, setFormData] = useState({
    paciente: '',
    medico: '',
    fecha: fechaTrabajo,
    hora: '09:00',
    motivo: '',
  });

  const [errorBackend, setErrorBackend] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Sincronizar fechaTrabajo con el formulario si cambia
  React.useEffect(() => {
    setFormData(prev => ({ ...prev, fecha: fechaTrabajo }));
  }, [fechaTrabajo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrorBackend('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorBackend('');
    setMensajeExito('');

    if (!formData.paciente || !formData.medico || !formData.fecha || !formData.hora || !formData.motivo.trim()) {
      setErrorBackend('Todos los campos son obligatorios para agendar la cita.');
      return;
    }

    setEnviando(true);
    try {
      await onCitaCreada({
        ...formData,
        paciente: parseInt(formData.paciente),
        medico: parseInt(formData.medico),
        // Estado por defecto: pendiente (id: 1)
        estado: 1
      });
      setMensajeExito('✅ ¡Cita médica agendada exitosamente!');
      setFormData(prev => ({
        ...prev,
        motivo: '',
        hora: '09:00'
      }));
    } catch (err) {
      setErrorBackend(err.message || 'Error al agendar cita');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="formulario-cita-box">
      <h3 className="form-cita-title">Agendar Nueva Cita</h3>

      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
      {errorBackend && <div className="alert alert-danger">{errorBackend}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="paciente">Paciente:</label>
            <select
              id="paciente"
              name="paciente"
              value={formData.paciente}
              onChange={handleChange}
              required
            >
              <option value="">-- Seleccionar Paciente --</option>
              {pacientes.map(p => (
                <option key={p.id} value={p.id}>
                  {p.nombres} (DNI: {p.dni})
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="medico">Médico especialista:</label>
            <select
              id="medico"
              name="medico"
              value={formData.medico}
              onChange={handleChange}
              required
            >
              <option value="">-- Seleccionar Médico --</option>
              {medicos.map(m => (
                <option key={m.id} value={m.id}>
                  Dr(a). {m.nombres} - {m.especialidad_nombre || 'General'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="fecha">Fecha:</label>
            <input
              id="fecha"
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="hora">Hora:</label>
            <input
              id="hora"
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              step="1800"
              required
            />
          </div>
        </div>

        <div className="form-field full-width">
          <label htmlFor="motivo">Motivo de la consulta:</label>
          <textarea
            id="motivo"
            name="motivo"
            rows="2"
            placeholder="Describa el motivo médico de la consulta..."
            value={formData.motivo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-cita-actions">
          <Boton type="submit" variante="primary" disabled={enviando}>
            {enviando ? 'Verificando y Agendando...' : 'Confirmar Reserva de Cita'}
          </Boton>
        </div>
      </form>
    </div>
  );
};
