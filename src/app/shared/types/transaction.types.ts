/**
 * Tipos relacionados con las transacciones del dashboard
 */

export type TransactionStatus = 'successful' | 'pending' | 'failed';

export type PaymentMethod = 
  | 'card' 
  | 'pse' 
  | 'nequi' 
  | 'bancolombia' 
  | 'daviplata';

export interface Transaction {
  id: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  salesType: 'terminal' | 'payment_link';
  createdAt: number; // timestamp
  transactionReference: string;
  amount: number;
  franchise?: string; // Últimos dígitos de tarjeta (opcional)
  deduction?: number; // Monto de deducción Bold (opcional)
}

export interface TransactionResponse {
  data: Transaction[];
}
