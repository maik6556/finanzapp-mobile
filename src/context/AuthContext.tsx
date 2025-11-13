// src/context/AuthContext.tsx
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

type AuthStatus = 'checking' | 'authenticated' | 'unauthenticated';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  status: AuthStatus;
  user?: User;
  isAuthenticated: boolean;
  isChecking: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<AuthStatus>('unauthenticated');
  const [user, setUser] = useState<User | undefined>(undefined);

  const signIn = (email: string, _password: string) => {
    setStatus('checking');

    // Simulación de login (mock)
    setTimeout(() => {
      setUser({
        id: 1,
        name: 'Usuario FinanzApp',
        email,
      });
      setStatus('authenticated');
    }, 1500);
  };

  const signOut = () => {
    setUser(undefined);
    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        isChecking: status === 'checking',
        isAuthenticated: status === 'authenticated',
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
