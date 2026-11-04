# Sistema Integral de Gestión de Citas Médicas — Clínica San Gabriel
### Evaluación 03 — Desarrollo de Aplicaciones Empresariales (Tecsup)

Arquitectura desacoplada empresarial construida con **Django REST Framework (Backend)** y **ReactJS con Vite (Frontend)**.

---

## 🏛️ Arquitectura del Proyecto

```text
Evaluacion-03/
├── clinica/                  # Configuración principal del proyecto Django
│   ├── settings.py           # Configuración de CORS, DRF y Apps instaladas
│   ├── urls.py               # Enrutamiento raíz con prefijo /api/
│   └── wsgi.py
├── citas/                    # Aplicación de gestión médica (Backend)
│   ├── models.py             # Modelos relacionales con ForeignKey, OneToOne y UniqueConstraint
│   ├── serializers.py        # Serializadores con campos de solo lectura y validaciones
│   ├── views.py              # ViewSets con filtrado por especialidad y fecha
│   ├── urls.py               # Rutas automáticas con DefaultRouter
│   └── admin.py              # Registro completo en el panel administrativo
├── clinica-frontend/         # Aplicación SPA en React (Frontend)
│   ├── src/
│   │   ├── components/       # Componentes reutilizables (Botón, Tarjetas, Formularios, etc.)
│   │   ├── context/          # ClinicaContext (Context API para usuario y fecha activa)
│   │   ├── pages/            # Páginas de Pacientes, Médicos y Citas
│   │   ├── services/api.js   # Cliente API HTTP (fetch) hacia http://localhost:8000/api/
│   │   ├── App.jsx           # Navegación y montaje
│   │   └── main.jsx
│   └── package.json
├── seed_data.py              # Script para inicializar datos de prueba
├── test_endpoints.py         # Suite de pruebas automatizadas de endpoints y validaciones 400
└── README.md
```

---

## 🚀 Puesta en Marcha

### 1. Backend (Django REST Framework)

1. **Instalar dependencias necesarias:**
   ```bash
   pip install django djangorestframework django-cors-headers django-filter
   ```

2. **Aplicar migraciones:**
   ```bash
   python manage.py migrate
   ```

3. **Cargar datos de prueba (Especialidades, Médicos, Pacientes, Estados y Superusuario):**
   ```bash
   python seed_data.py
   ```
   *Credenciales de administrador:*
   * **Usuario:** `admin`
   * **Contraseña:** `admin123`

4. **Iniciar el servidor de desarrollo:**
   ```bash
   python manage.py runserver
   ```
   *Backend disponible en:* `http://localhost:8000/api/`  
   *Panel de administración en:* `http://localhost:8000/admin/`

---

### 2. Frontend (React + Vite)

1. **Navegar a la carpeta del frontend e instalar dependencias:**
   ```bash
   cd clinica-frontend
   npm install
   ```

2. **Iniciar el servidor de desarrollo en Vite:**
   ```bash
   npm run dev
   ```
   *Frontend disponible en:* `http://localhost:5173/`

---

## 📋 Resumen de Respuestas y Preguntas de la Evaluación

* **Pregunta 1:** Modelos relacionales, justificación de `on_delete`, serializadores con campos calculados (`source`), validación de horarios y fechas pasadas (Error 400), ViewSets con filtros y habilitación CORS para `http://localhost:5173`.
* **Pregunta 2:** Inicialización de React con Vite, ciclo de vida con `useEffect`, consumo de `getEspecialidades()`, renderizado condicional, asignación de `key` y estructuración modular con CSS.
* **Pregunta 3:** Componentes reutilizables (`TarjetaMedico`, `Boton`), formulario controlado (`FormularioPaciente`) con validación cliente de DNI (8 dígitos), eliminación con confirmación (`TablaPacientes`), buscador dinámico y filtrado de médicos por especialidad con contador reactivo.
* **Pregunta 4:** Comunicación integral: paso de `props` (Padre a Hijo), `callbacks` (Hijo a Padre), elevación del estado (*Lifting State Up*) entre `ItemCita` y `DetalleCita`, actualización de estado en tiempo real vía PATCH deshabilitando estados finales, y uso de **Context API** (`ClinicaContext`) para la recepcionista activa y fecha operativa.
* **Pregunta 5:** Justificación teórica y reflexiva sobre desacoplamiento arquitectónico, diferencias de `props` vs `state`, conveniencia de elevar estado vs Context API, y necesidad crítica de la doble validación en el Backend por seguridad y concurrencia.
