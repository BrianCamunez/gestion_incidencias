import React, { createContext, useState, useContext, useEffect } from 'react';

// Crear el contexto para el email
const EmailContext = createContext();

// Crear un proveedor para envolver la aplicación y compartir el email
export const EmailProvider = ({ children }) => {
  const [email, setEmail] = useState(null);

  // Usamos useEffect para leer el email del localStorage al cargar la app
  useEffect(() => {
    const logeoConfirmado = localStorage.getItem('logeoConfirmado');
    if (logeoConfirmado) {
      const { email } = JSON.parse(logeoConfirmado);
      setEmail(email);
    }
  }, []);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

// Hook para acceder al contexto de email
export const useEmail = () => useContext(EmailContext);
