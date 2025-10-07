/**
 * Constantes de la aplicación
 */

export const API_BASE_URL = 'https://bold-fe-api.vercel.app/api';

export const FILTERS_STORAGE_KEY = 'bold-dashboard-filters';

export const DATE_FILTER_OPTIONS = [
  { value: 'today' as const, label: 'Hoy' },
  { value: 'week' as const, label: 'Esta semana' },
  { value: 'september' as const, label: 'Septiembre' },
  { value: 'all' as const, label: 'Todo el tiempo' }
];

export const SALES_TYPE_OPTIONS = [
  { value: 'terminal' as const, label: 'Cobro con datáfono' },
  { value: 'payment_link' as const, label: 'Link de pago' }
];

export const PAYMENT_METHOD_OPTIONS = [
  { value: 'card' as const, label: 'Tarjeta' },
  { value: 'pse' as const, label: 'PSE' },
  { value: 'nequi' as const, label: 'Nequi' },
  { value: 'bancolombia' as const, label: 'Bancolombia' },
  { value: 'daviplata' as const, label: 'Daviplata' }
];
