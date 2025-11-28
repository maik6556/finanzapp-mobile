// src/screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { useAuthForm } from '../hooks/useAuthForm';
import { useAuthContext } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = ({ navigation }: Props) => {
  // Hook que ya tenías para manejar email y password
  const { email, password, setEmail, setPassword } = useAuthForm();

  // Estado para cambiar entre "iniciar sesión" y "crear cuenta"
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Nombre solo se necesita para crear cuenta
  const [name, setName] = useState('');

  // Estado para errores en pantalla (correo no existe, contraseña incorrecta, etc.)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estado de cargando mientras se envía el formulario
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    isAuthenticated,
    isChecking,
    signIn,
    signUp,
  } = useAuthContext();

  // Si ya está autenticado, lo enviamos al Home
  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [isAuthenticated, navigation]);

  // Manejo de envío del formulario (tanto login como registro)
  const handleSubmit = async () => {
    if (isSubmitting) return;

    setErrorMessage(null);

    // Validación mínima
    if (mode === 'register' && !name.trim()) {
      setErrorMessage('Por favor ingresa tu nombre.');
      return;
    }

    if (!email.trim() || !password) {
      setErrorMessage('Debes ingresar correo y contraseña.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        // Iniciar sesión con un usuario ya existente
        const result = await signIn(email.trim(), password);
        if (!result.ok && result.message) {
          setErrorMessage(result.message);
        }
      } else {
        // Crear cuenta nueva
        const result = await signUp(name.trim(), email.trim(), password);
        if (!result.ok && result.message) {
          setErrorMessage(result.message);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    // Cambiamos entre login y register y limpiamos el error
    setMode(prev => (prev === 'login' ? 'register' : 'login'));
    setErrorMessage(null);
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.logo}>FinanzApp</Text>
        <Text style={styles.title}>
          {mode === 'login' ? 'Inicia sesión' : 'Crea tu cuenta'}
        </Text>
        <Text style={styles.subtitle}>
          {mode === 'login'
            ? 'Ingresa con tu correo y contraseña para ver y controlar tus finanzas.'
            : 'Registra una cuenta nueva para empezar a llevar el control de tus ingresos y gastos.'}
        </Text>
      </View>

      {(isChecking || isSubmitting) && (
        <View style={styles.loadingRow}>
          <ActivityIndicator size="small" color="#0F766E" />
          <Text style={styles.loadingText}>Procesando...</Text>
        </View>
      )}

      <View style={styles.form}>
        {mode === 'register' && (
          <TextInput
            placeholder="Nombre completo"
            placeholderTextColor="#94A3B8"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        )}

        <TextInput
          placeholder="Correo electrónico"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Contraseña"
          placeholderTextColor="#94A3B8"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {errorMessage && (
          <Text style={styles.errorText}>{errorMessage}</Text>
        )}

        <PrimaryButton
          label={mode === 'login' ? 'Entrar' : 'Crear cuenta'}
          onPress={handleSubmit}
          style={{ marginTop: 16 }}
        />

        <PrimaryButton
          label={
            mode === 'login'
              ? '¿No tienes cuenta? Crear una cuenta'
              : 'Ya tengo cuenta, iniciar sesión'
          }
          variant="secondary"
          onPress={toggleMode}
          style={{ marginTop: 12 }}
        />
      </View>

      <Text style={styles.footer}>
        Tus datos de acceso se almacenan solo dentro de la app para esta
        práctica. No hay cuentas predeterminadas, cada usuario crea la suya.
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 32,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
    color: '#0F766E',
  },
  form: {
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    color: '#0F172A',
  },
  errorText: {
    marginTop: 4,
    marginBottom: 4,
    color: '#DC2626',
    fontSize: 13,
  },
  footer: {
    marginTop: 'auto',
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
