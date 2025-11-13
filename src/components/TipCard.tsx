// src/components/TipCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  text: string;
}

export const TipCard = ({ text }: Props) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Tip de finanzas saludables</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ECFEFF',
    borderRadius: 16,
    padding: 14,
    marginTop: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F766E',
    marginBottom: 4,
  },
  text: {
    fontSize: 13,
    color: '#0F172A',
  },
});
