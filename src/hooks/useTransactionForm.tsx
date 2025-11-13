// src/hooks/useTransactionForm.tsx
import { useState } from 'react';

type TransactionType = 'income' | 'expense';

export const useTransactionForm = () => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [note, setNote] = useState<string>('');

  return {
    type,
    amount,
    category,
    note,
    setType,
    setAmount,
    setCategory,
    setNote,
  };
};
