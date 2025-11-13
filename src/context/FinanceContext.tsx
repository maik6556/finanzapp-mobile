// src/context/FinanceContext.tsx
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note?: string;
  date: string; // ISO string
}

interface FinanceState {
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
  medals: string[]; // gamificación simple
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
}

const FinanceContext = createContext({} as FinanceState);

export const useFinanceContext = () => useContext(FinanceContext);

const MOCK_INITIAL: Transaction[] = [
  {
    id: '1',
    type: 'income',
    amount: 1500000,
    category: 'Salario',
    note: 'Salario mensual',
    date: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'expense',
    amount: 250000,
    category: 'Mercado',
    note: 'Compras de la semana',
    date: new Date().toISOString(),
  },
];

export const FinanceProvider = ({ children }: PropsWithChildren) => {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_INITIAL);

  const { totalIncome, totalExpense, balance } = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense,
    };
  }, [transactions]);

  // Gamificación súper sencilla basada en balance y cantidad de registros
  const medals: string[] = useMemo(() => {
    const medalsArr: string[] = [];
    if (transactions.length >= 5) {
      medalsArr.push('Constancia: registras tus movimientos seguido 🏅');
    }
    if (balance > 0) {
      medalsArr.push('Ahorro positivo: cerraste el mes en verde 🥇');
    }
    if (totalExpense < totalIncome * 0.7) {
      medalsArr.push('Gasto saludable: controlaste tus egresos 🥈');
    }
    return medalsArr;
  }, [transactions.length, balance, totalExpense, totalIncome]);

  const addTransaction = (tx: Omit<Transaction, 'id' | 'date'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `${Date.now()}-${Math.random()}`,
      date: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        totalIncome,
        totalExpense,
        balance,
        medals,
        addTransaction,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
