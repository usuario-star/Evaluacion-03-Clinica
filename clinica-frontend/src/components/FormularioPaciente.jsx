import React, { useState } from 'react';
import { Boton } from './Boton';
import './FormularioPaciente.css';

export const FormularioPaciente = ({ onPacienteCreado }) => {
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    fecha_nacimiento: '',
    telefono: '',
    correo: ''
  });

  const [errores, setErrores] = useState({});
  const [mensajeExito, setMensajeExito] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar el error del campo si el usuario empieza a escribir
    if (errores[name]) {
      setErrores(prev => ({ ...prev, [name]: null }));
    }
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!formData.dni.trim()) {
      nuevosErrores.dni = 'El DNI es obligatorio';
    } else if (!/^\d{8}$/.test(formData.dni.trim())) {
      nuevosErrores.dni = 'El DNI debe tener exactamente 8 dígitos numéricos';
    }

    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = 'Los nombres son obligatorios';
    }

    if (!formData.fecha_nacimiento) {
      nuevosErrores.fecha_nacimiento = 'La fecha de nacimiento es obligatoria';
    }

    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = 'El teléfono es obligatorio';
    }

    if (!formData.correo.trim()) {
      nuevosErrores.correo = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      nuevosErrores.correo = 'Ingrese un formato de correo electrónico válido';
    }

    return nuevosErrores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');
    const formErrores = validar();

    if (Object.keys(formErrores).length > 0) {
      setErrores(formErrores);
      return;
    }

    setEnviando(true);
    try {
      await onPacienteCreado(formData);
      setMensajeExito('✅ ¡Paciente registrado con éxito!');
      setFormData({
        dni: '',
        nombres: '',
        fecha_nacimiento: '',
        telefono: '',
        correo: ''
      });
      setErrores({});
    } catch (err) {
      setErrores({ global: err.message });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="form-paciente-card">
      <h3 className="form-title">Registrar Nuevo Paciente</h3>
      
      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}
      {errores.global && <div className="alert alert-danger">{errores.global}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="dni">DNI (8 dígitos):</label>
          <input
            id="dni"
            type="text"
            name="dni"
            maxLength="8"
            placeholder="Ej. 74859612"
            value={formData.dni}
            onChange={handleChange}
            className={errores.dni ? 'input-error' : ''}
          />
          {errores.dni && <span className="error-text">{errores.dni}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="nombres">Nombres y Apellidos:</label>
          <input
            id="nombres"
            type="text"
            name="nombres"
            placeholder="Ej. Juan Pérez Gómez"
            value={formData.nombres}
            onChange={handleChange}
            className={errores.nombres ? 'input-error' : ''}
          />
          {errores.nombres && <span className="error-text">{errores.nombres}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento:</label>
          <input
            id="fecha_nacimiento"
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            className={errores.fecha_nacimiento ? 'input-error' : ''}
          />
          {errores.fecha_nacimiento && <span className="error-text">{errores.fecha_nacimiento}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            id="telefono"
            type="text"
            name="telefono"
            placeholder="Ej. 987654321"
            value={formData.telefono}
            onChange={handleChange}
            className={errores.telefono ? 'input-error' : ''}
          />
          {errores.telefono && <span className="error-text">{errores.telefono}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="correo">Correo Electrónico:</label>
          <input
            id="correo"
            type="email"
            name="correo"
            placeholder="Ej. paciente@gmail.com"
            value={formData.correo}
            onChange={handleChange}
            className={errores.correo ? 'input-error' : ''}
          />
          {errores.correo && <span className="error-text">{errores.correo}</span>}
        </div>

        <div className="form-actions">
          <Boton type="submit" variante="primary" disabled={enviando}>
            {enviando ? 'Guardando...' : 'Guardar Paciente'}
          </Boton>
        </div>
      </form>
    </div>
  );
};
