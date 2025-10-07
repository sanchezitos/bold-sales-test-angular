/**
 * Tipos relacionados con los filtros del dashboard
 */

export type DateFilter = 'today' | 'week' | 'september' | 'all';

export type SalesType = 'terminal' | 'payment_link';

export type PaymentMethod = 
  | 'card' 
  | 'pse' 
  | 'nequi' 
  | 'bancolombia' 
  | 'daviplata';

export interface Filters {
  salesTypes: SalesType[];
  paymentMethods: PaymentMethod[];
  dateFilter: DateFilter;
  searchQuery: string;
}

export interface FiltersState extends Filters {
  isInitialized: boolean;
}
