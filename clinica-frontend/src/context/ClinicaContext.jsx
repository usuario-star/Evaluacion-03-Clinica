import React, { createContext, useState } from 'react';

export const ClinicaContext = createContext();

export const ClinicaProvider = ({ children }) => {
  const [recepcionista, setRecepcionista] = useState('Lic. Carmen Delgado (Recepción Central)');
  const [fechaTrabajo, setFechaTrabajo] = useState(new Date().toISOString().split('T')[0]);

  return (
    <ClinicaContext.Provider value={{ recepcionista, setRecepcionista, fechaTrabajo, setFechaTrabajo }}>
      {children}
    </ClinicaContext.Provider>
  );
};
