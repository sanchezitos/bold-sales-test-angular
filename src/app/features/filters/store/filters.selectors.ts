import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FiltersState } from './filters.reducer';

export const selectFiltersState = createFeatureSelector<FiltersState>('filters');

export const selectDateFilter = createSelector(
  selectFiltersState,
  (state) => state.dateFilter
);

export const selectPaymentMethods = createSelector(
  selectFiltersState,
  (state) => state.paymentMethods
);

export const selectSearchQuery = createSelector(
  selectFiltersState,
  (state) => state.searchQuery
);

export const selectSalesTypes = createSelector(
  selectFiltersState,
  (state) => state.salesTypes
);

export const selectIsInitialized = createSelector(
  selectFiltersState,
  (state) => state.isInitialized
);

export const selectAllFilters = createSelector(
  selectFiltersState,
  (state) => state
);
