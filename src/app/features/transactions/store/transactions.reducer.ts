import { createReducer, on } from '@ngrx/store';
import * as TransactionsActions from './transactions.actions';

export interface TransactionsState {
  transactions: any[];
  selectedTransaction: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  transactions: [],
  selectedTransaction: null,
  loading: false,
  error: null
};

export const transactionsReducer = createReducer(
  initialState,
  
  on(TransactionsActions.loadTransactions, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(TransactionsActions.loadTransactionsSuccess, (state, { transactions }) => ({
    ...state,
    transactions,
    loading: false,
    error: null
  })),
  
  on(TransactionsActions.loadTransactionsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  
  on(TransactionsActions.setSelectedTransaction, (state, { transaction }) => ({
    ...state,
    selectedTransaction: transaction
  })),
  
  on(TransactionsActions.clearSelectedTransaction, (state) => ({
    ...state,
    selectedTransaction: null
  }))
);
