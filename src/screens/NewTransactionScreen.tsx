// src/screens/NewTransactionScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { useTransactionForm } from '../hooks/useTransactionForm';
import { useFinanceContext } from '../context/FinanceContext';

type Props = NativeStackScreenProps<RootStackParamList, 'NewTransaction'>;

export const NewTransactionScreen = ({ navigation }: Props) => {
  const {
    type,
    amount,
    category,
    note,
    setType,
    setAmount,
    setCategory,
    setNote,
  } = useTransactionForm();
  const { addTransaction } = useFinanceContext();

  const handleSave = () => {
    const numericAmount = Number(amount.replace(',', '.'));

    if (!numericAmount || !category) {
      Alert.alert('Datos incompletos', 'Ingresa al menos monto y categoría.');
      return;
    }

    addTransaction({
      type,
      amount: numericAmount,
      category,
      note,
    });

    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Text style={styles.title}>Nuevo movimiento</Text>
      <Text style={styles.subtitle}>
        Registra un ingreso o gasto para mantener tu control financiero al día.
      </Text>

      <Text style={styles.label}>Tipo</Text>
      <View style={styles.typeRow}>
        <Pressable
          style={[
            styles.typeChip,
            type === 'income' && styles.typeChipActiveIncome,
          ]}
          onPress={() => setType('income')}
        >
          <Text
            style={[
              styles.typeChipText,
              type === 'income' && styles.typeChipTextActive,
            ]}
          >
            Ingreso
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.typeChip,
            type === 'expense' && styles.typeChipActiveExpense,
          ]}
          onPress={() => setType('expense')}
        >
          <Text
            style={[
              styles.typeChipText,
              type === 'expense' && styles.typeChipTextActive,
            ]}
          >
            Gasto
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>Monto (COP)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Ej: 150000"
        value={amount}
        onChangeText={setAmount}
      />

      <Text style={styles.label}>Categoría</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Mercado, transporte, ocio..."
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Nota (opcional)</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        placeholder="Añade un detalle corto"
        value={note}
        onChangeText={setNote}
      />

      <PrimaryButton label="Guardar" onPress={handleSave} />

      <PrimaryButton
        label="Cancelar"
        variant="secondary"
        onPress={() => navigation.goBack()}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#64748B',
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
    marginTop: 8,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 4,
  },
  typeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  typeChip: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingVertical: 8,
    alignItems: 'center',
  },
  typeChipActiveIncome: {
    borderColor: '#16A34A',
    backgroundColor: '#DCFCE7',
  },
  typeChipActiveExpense: {
    borderColor: '#DC2626',
    backgroundColor: '#FEE2E2',
  },
  typeChipText: {
    fontSize: 13,
    color: '#0F172A',
  },
  typeChipTextActive: {
    fontWeight: '700',
  },
});
