import React, { useState, useEffect } from 'react';
import { ClinicaProvider } from './context/ClinicaContext';
import { Encabezado } from './components/Encabezado';
import { PiePagina } from './components/PiePagina';
import { PaginaMedicos } from './pages/PaginaMedicos';
import { PaginaPacientes } from './pages/PaginaPacientes';
import { PaginaCitas } from './pages/PaginaCitas';
import { getEspecialidades } from './services/api';
import './App.css';

export function App() {
  const [tabActiva, setTabActiva] = useState('citas'); // 'citas' | 'pacientes' | 'medicos' | 'especialidades'
  const [especialidades, setEspecialidades] = useState([]);
  const [cargandoEsp, setCargandoEsp] = useState(true);
  const [errorEsp, setErrorEsp] = useState(null);

  // Pregunta 2: Uso de useEffect para cargar especialidades al montar
  useEffect(() => {
    const cargar = async () => {
      try {
        const data = await getEspecialidades();
        setEspecialidades(data);
      } catch (err) {
        setErrorEsp('Error de conexión con la API de Django: ' + err.message);
      } finally {
        setCargandoEsp(false);
      }
    };
    cargar();
  }, []);

  return (
    <ClinicaProvider>
      <div className="app-container">
        <Encabezado />

        {/* Barra de navegación de la aplicación */}
        <nav className="app-nav">
          <button
            className={`nav-tab ${tabActiva === 'citas' ? 'active' : ''}`}
            onClick={() => setTabActiva('citas')}
          >
            📅 Reserva y Control de Citas
          </button>
          <button
            className={`nav-tab ${tabActiva === 'pacientes' ? 'active' : ''}`}
            onClick={() => setTabActiva('pacientes')}
          >
            👥 Directorio de Pacientes
          </button>
          <button
            className={`nav-tab ${tabActiva === 'medicos' ? 'active' : ''}`}
            onClick={() => setTabActiva('medicos')}
          >
            🩺 Staff Médico
          </button>
          <button
            className={`nav-tab ${tabActiva === 'especialidades' ? 'active' : ''}`}
            onClick={() => setTabActiva('especialidades')}
          >
            🏥 Especialidades ({especialidades.length})
          </button>
        </nav>

        {/* Contenido Principal */}
        <main className="main-content">
          {tabActiva === 'citas' && <PaginaCitas />}
          {tabActiva === 'pacientes' && <PaginaPacientes />}
          {tabActiva === 'medicos' && <PaginaMedicos />}

          {tabActiva === 'especialidades' && (
            <div className="pagina-especialidades">
              <h2 className="section-title">Especialidades de la Clínica San Gabriel</h2>
              <p className="section-description">
                Listado cargado dinámicamente desde el endpoint de Django REST Framework (<code>/api/especialidades/</code>).
              </p>

              {/* Renderizado condicional con operador ternario y && */}
              {cargandoEsp && <div className="loading-box">Cargando especialidades...</div>}
              {errorEsp && <div className="alert alert-danger">{errorEsp}</div>}

              {!cargandoEsp && !errorEsp && (
                <div className="especialidades-grid">
                  {especialidades.map((esp) => (
                    <div key={esp.id} className="especialidad-card">
                      <div className="especialidad-header">
                        <span className="esp-icon">🩺</span>
                        <h3 className="esp-nombre">{esp.nombre}</h3>
                      </div>
                      <p className="esp-desc">{esp.descripcion || 'Sin descripción detallada.'}</p>
                      <span className="esp-id-tag">ID: #{esp.id}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>

        <PiePagina />
      </div>
    </ClinicaProvider>
  );
}

export default App;
