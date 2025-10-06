import { FiltersState } from '../features/filters/store/filters.reducer';
import { TransactionsState } from '../features/transactions/store/transactions.reducer';

export interface AppState {
  filters: FiltersState;
  transactions: TransactionsState;
}
