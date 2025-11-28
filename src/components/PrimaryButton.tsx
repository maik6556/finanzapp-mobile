// src/components/PrimaryButton.tsx

// Importa React y los componentes/estilos básicos de React Native necesarios para crear un botón personalizado.
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

// Define la interfaz de props que recibe el botón: texto, función al presionar, tipo de estilo (primario/secundario) y estilos adicionales opcionales.
interface Props {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

// Componente de botón reutilizable que muestra un texto y ejecuta una acción al presionarlo, cambiando colores según el tipo (variant).
export const PrimaryButton = ({
  label,
  onPress,
  variant = 'primary',
  style,
}: Props) => {
  // Define los colores de fondo y texto según si el botón es de tipo primario o secundario.
  const backgroundColor = variant === 'primary' ? '#0F766E' : '#E2E8F0';
  const textColor = variant === 'primary' ? '#FFFFFF' : '#0F172A';

  // Renderiza el botón presionable con estilos base, efecto de opacidad al presionar y el texto configurado.
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor },
        pressed ? { opacity: 0.7 } : { opacity: 1 },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
};

// Define los estilos reutilizables del botón y del texto (label) para mantener una apariencia consistente.
const styles = StyleSheet.create({
  // Estilos visuales del contenedor del botón: tamaño interno, forma redondeada, centrado y márgenes.
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  // Estilos del texto dentro del botón: tamaño de fuente y peso de la tipografía.
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
