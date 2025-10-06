import { createReducer, on } from '@ngrx/store';
import * as FiltersActions from './filters.actions';

export interface FiltersState {
  dateFilter: 'today' | 'week' | 'september' | 'currentMonth' | 'all';
  paymentMethods: string[];
  searchQuery: string;
  salesTypes: string[];
  isInitialized: boolean;
}

const initialState: FiltersState = {
  dateFilter: 'today',
  paymentMethods: [],
  searchQuery: '',
  salesTypes: [],
  isInitialized: false
};

export const filtersReducer = createReducer(
  initialState,
  
  on(FiltersActions.initializeFilters, (state) => ({
    ...state,
    isInitialized: true
  })),
  
  on(FiltersActions.setDateFilter, (state, { dateFilter }) => ({
    ...state,
    dateFilter
  })),
  
  on(FiltersActions.setPaymentMethods, (state, { paymentMethods }) => ({
    ...state,
    paymentMethods
  })),
  
  on(FiltersActions.togglePaymentMethod, (state, { method }) => ({
    ...state,
    paymentMethods: state.paymentMethods.includes(method)
      ? state.paymentMethods.filter(m => m !== method)
      : [...state.paymentMethods, method]
  })),
  
  on(FiltersActions.setSearchQuery, (state, { query }) => ({
    ...state,
    searchQuery: query
  })),
  
  on(FiltersActions.setSalesTypes, (state, { salesTypes }) => ({
    ...state,
    salesTypes
  })),
  
  on(FiltersActions.toggleSalesType, (state, { salesType }) => ({
    ...state,
    salesTypes: state.salesTypes.includes(salesType)
      ? state.salesTypes.filter(t => t !== salesType)
      : [...state.salesTypes, salesType]
  })),
  
  on(FiltersActions.clearFilters, (state) => ({
    ...state,
    dateFilter: 'today',
    paymentMethods: [],
    searchQuery: '',
    salesTypes: []
  }))
);
