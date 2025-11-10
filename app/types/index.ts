export interface PaymentHistoryItem {
  id: string;
  date: string;
  amount: string;
  keycode: string;
  status: 'Successful' | 'Failed';
  type: 'Top-up' | 'Debit';
}

export interface User {
  name: string;
  walletBalance: number;
}

export interface PaymentFormData {
  lampNumber: string;
  amount: string;
  paymentMethod: 'wallet' | 'card';
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
}

export const Colors = {
  primary: '#FFD700',
  primaryDark: '#FFC400',
  secondary: '#FFA000',
  background: '#FFFFFF',
  card: '#FFFFFF',
  text: '#333333',
  textSecondary: '#666666',
  border: '#E0E0E0',
  success: '#4CAF50',
  error: '#F44336',
  naira: '#1A4F1A',
  debit: '#F44336',
  topup: '#4CAF50',
  tabBar: '#1a1a1a',
};