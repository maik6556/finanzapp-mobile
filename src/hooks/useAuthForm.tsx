// src/hooks/useAuthForm.tsx
import { useState } from 'react';

export const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return {
    email,
    password,
    setEmail,
    setPassword,
  };
};
