import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionsState } from './transactions.reducer';

export const selectTransactionsState = createFeatureSelector<TransactionsState>('transactions');

export const selectAllTransactions = createSelector(
  selectTransactionsState,
  (state) => state.transactions
);

export const selectSelectedTransaction = createSelector(
  selectTransactionsState,
  (state) => state.selectedTransaction
);

export const selectTransactionsLoading = createSelector(
  selectTransactionsState,
  (state) => state.loading
);

export const selectTransactionsError = createSelector(
  selectTransactionsState,
  (state) => state.error
);
