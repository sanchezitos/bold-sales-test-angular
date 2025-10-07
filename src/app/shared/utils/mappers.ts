/**
 * Mappers para transformar datos de la API al formato interno
 */

import { 
  ApiTransaction, 
  ApiTransactionStatus, 
  ApiPaymentMethod, 
  ApiSalesType 
} from '../types/api.types';
import { 
  Transaction, 
  TransactionStatus, 
  PaymentMethod 
} from '../types/transaction.types';

/**
 * Mapea el status de la API (MAYÚSCULAS) a formato interno (lowercase)
 */
export function mapTransactionStatus(apiStatus: ApiTransactionStatus): TransactionStatus {
  const statusMap: Record<ApiTransactionStatus, TransactionStatus> = {
    'SUCCESSFUL': 'successful',
    'REJECTED': 'failed',
    'PENDING': 'pending',
  };
  
  return statusMap[apiStatus] || 'pending';
}

/**
 * Mapea el método de pago de la API (MAYÚSCULAS) a formato interno (lowercase)
 */
export function mapPaymentMethod(apiMethod: ApiPaymentMethod): PaymentMethod {
  const methodMap: Record<ApiPaymentMethod, PaymentMethod> = {
    'CARD': 'card',
    'PSE': 'pse',
    'NEQUI': 'nequi',
    'BANCOLOMBIA': 'bancolombia',
    'DAVIPLATA': 'daviplata',
  };
  
  return methodMap[apiMethod] || 'card';
}

/**
 * Mapea el tipo de venta de la API (MAYÚSCULAS) a formato interno (lowercase)
 */
export function mapSalesType(apiSalesType: ApiSalesType): 'terminal' | 'payment_link' {
  const salesTypeMap: Record<ApiSalesType, 'terminal' | 'payment_link'> = {
    'TERMINAL': 'terminal',
    'PAYMENT_LINK': 'payment_link',
  };
  
  return salesTypeMap[apiSalesType] || 'terminal';
}

/**
 * Transforma una transacción de la API al formato interno
 */
export function mapApiTransaction(apiTransaction: ApiTransaction): Transaction {
  return {
    id: apiTransaction.id,
    status: mapTransactionStatus(apiTransaction.status),
    paymentMethod: mapPaymentMethod(apiTransaction.paymentMethod),
    salesType: mapSalesType(apiTransaction.salesType),
    createdAt: apiTransaction.createdAt,
    transactionReference: apiTransaction.transactionReference.toString(), // Convertir número a string
    amount: apiTransaction.amount,
    franchise: apiTransaction.franchise,
    deduction: apiTransaction.deduction,
  };
}

/**
 * Transforma un array de transacciones de la API al formato interno
 */
export function mapApiTransactions(apiTransactions: ApiTransaction[]): Transaction[] {
  return apiTransactions.map(mapApiTransaction);
}
