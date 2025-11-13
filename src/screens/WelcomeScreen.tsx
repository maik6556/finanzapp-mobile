// src/screens/WelcomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from '../components/PrimaryButton';
import { ScreenContainer } from '../components/ScreenContainer';
import type { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.logo}>FinanzApp</Text>
        <Text style={styles.subtitle}>
          Tu asistente personal para finanzas saludables
        </Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.title}>Transformando hábitos, mejorando vidas</Text>
        <Text style={styles.text}>
          Con FinanzApp queremos ayudar a las familias colombianas a tomar
          mejores decisiones financieras y alcanzar la tranquilidad económica
          que merecen.
        </Text>
      </View>

      <View style={styles.actions}>
        <PrimaryButton
          label="Iniciar"
          onPress={() => navigation.navigate('Login')}
        />
      </View>

      <Text style={styles.footer}>Proyecto académico · Electiva 5</Text>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 8,
    textAlign: 'center',
  },
  block: {
    backgroundColor: '#F1F5F9',
    borderRadius: 18,
    padding: 18,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#475569',
  },
  actions: {
    marginTop: 24,
  },
  footer: {
    marginTop: 'auto',
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
});
