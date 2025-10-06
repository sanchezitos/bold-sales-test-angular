import { createAction, props } from '@ngrx/store';

export interface Transaction {
  id: string;
  amount: number;
  status: 'successful' | 'pending' | 'failed';
  paymentMethod: string;
  paymentType: 'payment_link' | 'terminal';
  date: string;
  deduction?: number;
}

export const loadTransactions = createAction('[Transactions] Load Transactions');

export const loadTransactionsSuccess = createAction(
  '[Transactions] Load Transactions Success',
  props<{ transactions: Transaction[] }>()
);

export const loadTransactionsFailure = createAction(
  '[Transactions] Load Transactions Failure',
  props<{ error: string }>()
);

export const setSelectedTransaction = createAction(
  '[Transactions] Set Selected Transaction',
  props<{ transaction: Transaction | null }>()
);

export const clearSelectedTransaction = createAction('[Transactions] Clear Selected Transaction');
