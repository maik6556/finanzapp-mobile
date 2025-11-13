// src/screens/LoginScreen.tsx
import React, { useEffect } from 'react';
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
  const { email, password, setEmail, setPassword } = useAuthForm();
  const { isChecking, isAuthenticated, signIn } = useAuthContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  }, [isAuthenticated, navigation]);

  return (
    <ScreenContainer>
      <Text style={styles.title}>Inicia sesión</Text>
      <Text style={styles.subtitle}>
        Conecta tu FinanzApp y empieza a organizar tus finanzas.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isChecking ? (
        <ActivityIndicator
          size="small"
          color="#0F766E"
          style={{ marginVertical: 12 }}
        />
      ) : (
        <PrimaryButton
          label="Entrar"
          onPress={() => {
            if (!email || !password) return;
            signIn(email, password);
          }}
        />
      )}

      <Text style={styles.back} onPress={() => navigation.goBack()}>
        ← Volver
      </Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  back: {
    marginTop: 32,
    fontSize: 14,
    color: '#0F766E',
  },
});
