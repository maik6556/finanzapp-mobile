import { useState } from 'react';

// Custom hook que encapsula el estado de un formulario de autenticación
export const useAuthForm = () => {

  // Estado para almacenar el email ingresado por el usuario
  const [email, setEmail] = useState('');

  // Estado para almacenar la contraseña ingresada por el usuario
  const [password, setPassword] = useState('');

  // Retorna los valores y sus setters para usarlos en un componente
  return {
    email,        // valor actual del email
    password,     // valor actual de la contraseña
    setEmail,     // función para actualizar el email
    setPassword,  // función para actualizar la contraseña
  };
};
