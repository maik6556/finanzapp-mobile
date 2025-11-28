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

interface AuthResult {
  ok: boolean;
  message?: string;
}

interface AuthContextValue {
  status: AuthStatus;
  user: User | null;
  isAuthenticated: boolean;
  isChecking: boolean;
  signIn: (email: string, password: string) => Promise<AuthResult>;
  signUp: (name: string, email: string, password: string) => Promise<AuthResult>;
  signOut: () => void;
}

// Usuario interno con contraseña (no se expone fuera del contexto)
interface InternalUser extends User {
  password: string;
}

// 1. Creamos el contexto de autenticación
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// 2. Provider que envuelve a la app y maneja el estado de autenticación
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [status, setStatus] = useState<AuthStatus>('unauthenticated');
  const [user, setUser] = useState<User | null>(null);

  // Lista de usuarios registrados en esta ejecución de la app
  const [users, setUsers] = useState<InternalUser[]>([]);

  // 3. Sign In: iniciar sesión con un usuario ya creado
  const signIn = async (email: string, password: string): Promise<AuthResult> => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      u => u.email.trim().toLowerCase() === normalizedEmail,
    );

    if (!existingUser) {
      // Si no existe el usuario, indicamos que debe crear la cuenta
      return {
        ok: false,
        message: 'El usuario no existe. Crea una cuenta primero.',
      };
    }

    if (existingUser.password !== password) {
      // Contraseña incorrecta
      return {
        ok: false,
        message: 'Contraseña incorrecta.',
      };
    }

    // Si todo está bien, autenticamos
    const { password: _, ...publicUser } = existingUser;
    setUser(publicUser);
    setStatus('authenticated');

    return { ok: true };
  };

  // 4. Sign Up: crear una nueva cuenta
  const signUp = async (
    name: string,
    email: string,
    password: string,
  ): Promise<AuthResult> => {
    const normalizedEmail = email.trim().toLowerCase();

    const existingUser = users.find(
      u => u.email.trim().toLowerCase() === normalizedEmail,
    );

    if (existingUser) {
      return {
        ok: false,
        message: 'Ya existe una cuenta con este correo.',
      };
    }

    const newUser: InternalUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
    };

    setUsers(prev => [...prev, newUser]);

    const { password: _, ...publicUser } = newUser;
    setUser(publicUser);
    setStatus('authenticated');

    return { ok: true };
  };

  // 5. Cerrar sesión
  const signOut = () => {
    setUser(null);
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
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 6. Hook de conveniencia para usar el contexto
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuthContext debe usarse dentro de un AuthProvider');
  }
  return ctx;
};
