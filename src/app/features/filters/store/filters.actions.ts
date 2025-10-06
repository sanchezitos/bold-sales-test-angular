import { createAction, props } from '@ngrx/store';

export type DateFilter = 'today' | 'week' | 'september' | 'currentMonth' | 'all';

export const initializeFilters = createAction('[Filters] Initialize Filters');

export const setDateFilter = createAction(
  '[Filters] Set Date Filter',
  props<{ dateFilter: DateFilter }>()
);

export const setPaymentMethods = createAction(
  '[Filters] Set Payment Methods',
  props<{ paymentMethods: string[] }>()
);

export const togglePaymentMethod = createAction(
  '[Filters] Toggle Payment Method',
  props<{ method: string }>()
);

export const setSearchQuery = createAction(
  '[Filters] Set Search Query',
  props<{ query: string }>()
);

export const clearFilters = createAction('[Filters] Clear Filters');

export const setSalesTypes = createAction(
  '[Filters] Set Sales Types',
  props<{ salesTypes: string[] }>()
);

export const toggleSalesType = createAction(
  '[Filters] Toggle Sales Type',
  props<{ salesType: string }>()
);
