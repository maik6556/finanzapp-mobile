import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';

// Componente que actúa como un contenedor base para cualquier pantalla de la app.
// Recibe `children`, que son los componentes internos que se renderizan dentro.
export const ScreenContainer = ({ children }: PropsWithChildren) => {
  // Simplemente devuelve una vista con estilos predefinidos y los hijos dentro.
  return <View style={styles.container}>{children}</View>;
};

// Estilos del contenedor de pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,              // Ocupa toda la pantalla disponible
    backgroundColor: '#FFFFFF', // Fondo blanco
    paddingHorizontal: 24, // Espaciado lateral consistente
    paddingTop: 60,        // Espaciado superior (para separar del header o evitar notch)
    paddingBottom: 24,     // Espaciado inferior
  },
});
