// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { FinanceProvider } from './src/context/FinanceContext';

export default function App() {
  return (
    <AuthProvider>
      <FinanceProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </FinanceProvider>
    </AuthProvider>
  );
}
