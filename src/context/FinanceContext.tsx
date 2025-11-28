import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

// Tipos permitidos para una transacción
type TransactionType = 'income' | 'expense';

// Estructura de una transacción completa
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note?: string;
  date: string; // formato ISO
}

// Interfaz del estado que guardará el FinanceContext
interface FinanceState {
  transactions: Transaction[];
  totalIncome: number;
  totalExpense: number;
  balance: number;
  medals: string[]; // Logros tipo "gamificación"
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void; // agrega una tx
}

// Se crea un contexto vacío con el tipo FinanceState
const FinanceContext = createContext({} as FinanceState);

// Custom hook para consumir el contexto fácilmente
export const useFinanceContext = () => useContext(FinanceContext);

// Datos iniciales simulados (mock)
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

// Provider que envuelve a la app o pantallas específicas
export const FinanceProvider = ({ children }: PropsWithChildren) => {
  // Estado principal: lista de transacciones
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_INITIAL);

  // Cálculo memoizado de totales y balance
  const { totalIncome, totalExpense, balance } = useMemo(() => {
    // Suma de todos los ingresos
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);

    // Suma de todos los egresos
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);

    return {
      totalIncome: income,
      totalExpense: expense,
      balance: income - expense, // balance general
    };
  }, [transactions]); // Solo se recalcula cuando cambian las transacciones

  // Sistema de medallas basado en la actividad financiera del usuario
  const medals: string[] = useMemo(() => {
    const medalsArr: string[] = [];

    // 1. Medalla por registrar varias transacciones
    if (transactions.length >= 5) {
      medalsArr.push('Constancia: registras tus movimientos seguido 🏅');
    }

    // 2. Medalla por mantener un balance positivo
    if (balance > 0) {
      medalsArr.push('Ahorro positivo: cerraste el mes en verde 🥇');
    }

    // 3. Medalla por mantener gastos saludables
    if (totalExpense < totalIncome * 0.7) {
      medalsArr.push('Gasto saludable: controlaste tus egresos 🥈');
    }

    return medalsArr;
  }, [transactions.length, balance, totalExpense, totalIncome]);
  // Dependencias que afectan las medallas

  // Función para agregar una transacción
  const addTransaction = (tx: Omit<Transaction, 'id' | 'date'>) => {
    // Se completa la transacción con id y fecha
    const newTx: Transaction = {
      ...tx,
      id: `${Date.now()}-${Math.random()}`, // id único básico
      date: new Date().toISOString(),
    };

    // Se inserta la nueva transacción al inicio del array
    setTransactions((prev) => [newTx, ...prev]);
  };

  // El provider expone todos los valores del contexto
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
