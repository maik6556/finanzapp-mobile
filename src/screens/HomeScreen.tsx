// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/RootNavigator';
import { ScreenContainer } from '../components/ScreenContainer';
import { PrimaryButton } from '../components/PrimaryButton';
import { StatCard } from '../components/StatCard';
import { TipCard } from '../components/TipCard';
import { useFinanceContext } from '../context/FinanceContext';
import { useAuthContext } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const TIPS: string[] = [
  'Registra al menos un gasto al día para mantener conciencia de tu dinero.',
  'Separa primero el ahorro y después gasta lo que queda.',
  'Agrupa tus gastos en categorías: hogar, transporte, ocio, deudas.',
];

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

export const HomeScreen = ({ navigation }: Props) => {
  const { totalIncome, totalExpense, balance, transactions, medals } =
    useFinanceContext();
  const { user, signOut } = useAuthContext();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>
            Hola, {user?.name ?? 'FinanzApp user'} 👋
          </Text>
          <Text style={styles.caption}>Finanzas saludables al alcance.</Text>
        </View>

        <Text style={styles.logout} onPress={signOut}>
          Cerrar sesión
        </Text>
      </View>

      <View style={styles.statsRow}>
        <StatCard
          label="Ingresos"
          value={formatCurrency(totalIncome)}
          kind="income"
        />
        <StatCard
          label="Gastos"
          value={formatCurrency(totalExpense)}
          kind="expense"
        />
        <StatCard
          label="Balance"
          value={formatCurrency(balance)}
          kind="balance"
        />
      </View>

      <PrimaryButton
        label="Registrar ingreso / gasto"
        onPress={() => navigation.navigate('NewTransaction')}
        style={{ marginTop: 12 }}
      />

      <TipCard text={TIPS[0]} />

      {medals.length > 0 && (
        <View style={styles.medalsBox}>
          <Text style={styles.medalsTitle}>Tus logros</Text>
          {medals.map((m) => (
            <Text key={m} style={styles.medalItem}>
              • {m}
            </Text>
          ))}
        </View>
      )}

      <Text style={styles.sectionTitle}>Movimientos recientes</Text>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 8 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.txItem}>
            <View>
              <Text style={styles.txCategory}>{item.category}</Text>
              {item.note ? (
                <Text style={styles.txNote}>{item.note}</Text>
              ) : null}
            </View>
            <Text
              style={[
                styles.txAmount,
                { color: item.type === 'income' ? '#16A34A' : '#DC2626' },
              ]}
            >
              {item.type === 'income' ? '+' : '-'}
              {formatCurrency(item.amount)}
            </Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  hello: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  caption: {
    fontSize: 12,
    color: '#64748B',
  },
  logout: {
    fontSize: 12,
    color: '#DC2626',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  medalsBox: {
    marginTop: 14,
    backgroundColor: '#EFF6FF',
    borderRadius: 14,
    padding: 10,
  },
  medalsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1D4ED8',
    marginBottom: 4,
  },
  medalItem: {
    fontSize: 12,
    color: '#1E293B',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    marginTop: 16,
  },
  txItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E2E8F0',
  },
  txCategory: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0F172A',
  },
  txNote: {
    fontSize: 12,
    color: '#64748B',
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
});
