import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import * as fromFilters from '../features/filters/store/filters.reducer';
import * as fromTransactions from '../features/transactions/store/transactions.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  filters: fromFilters.filtersReducer,
  transactions: fromTransactions.transactionsReducer
};
