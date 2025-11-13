// src/components/StatCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  label: string;
  value: string;
  kind?: 'income' | 'expense' | 'balance';
}

export const StatCard = ({ label, value, kind = 'balance' }: Props) => {
  const color =
    kind === 'income' ? '#16A34A' : kind === 'expense' ? '#DC2626' : '#0F172A';

  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: '#64748B',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
  },
});
