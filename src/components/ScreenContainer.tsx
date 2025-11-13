// src/components/ScreenContainer.tsx
import React, { PropsWithChildren } from 'react';
import { View, StyleSheet } from 'react-native';

export const ScreenContainer = ({ children }: PropsWithChildren) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
  },
});
