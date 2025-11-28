import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

// Definimos las props que acepta el botón
interface Props {
  label: string; // Texto del botón
  onPress?: () => void; // Función al presionarlo
  variant?: 'primary' | 'secondary'; // Tipo de estilo
  style?: ViewStyle; // Estilos adicionales desde el componente padre
}

export const PrimaryButton = ({
  label,
  onPress,
  variant = 'primary', // valor por defecto
  style,
}: Props) => {

  // Color del fondo según la variante
  const backgroundColor = variant === 'primary' ? '#0F766E' : '#E2E8F0';

  // Color del texto según la variante
  const textColor = variant === 'primary' ? '#FFFFFF' : '#0F172A';

  return (
    <Pressable
      // `style` puede ser una función que recibe el estado "pressed"
      style={({ pressed }) => [
        styles.button,                // estilos base
        { backgroundColor },          // color dinámico
        pressed ? { opacity: 0.7 } : { opacity: 1 }, // efecto al presionar
        style,                        // estilo adicional opcional
      ]}
      onPress={onPress}
    >
      {/* Texto del botón */}
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

// Estilos base del componente
const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999, // redondeado tipo pill
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
