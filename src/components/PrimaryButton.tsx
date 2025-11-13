// src/components/PrimaryButton.tsx
import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
}

export const PrimaryButton = ({
  label,
  onPress,
  variant = 'primary',
  style,
}: Props) => {
  const backgroundColor = variant === 'primary' ? '#0F766E' : '#E2E8F0';
  const textColor = variant === 'primary' ? '#FFFFFF' : '#0F172A';

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

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
