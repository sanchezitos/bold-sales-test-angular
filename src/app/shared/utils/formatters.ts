/**
 * Funciones de formateo para datos de la aplicación
 * Lógica de negocio pura - sin dependencias de Angular
 */

/**
 * Formatea un monto a formato de moneda
 */
export function formatCurrency(
  amount: number,
  currency: string = 'COP',
  locale: string = 'es-CO'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea una fecha a formato corto (DD/MM/AAAA)
 */
export function formatDateShort(
  date: Date | string | number,
  locale: string = 'es-CO'
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).format(dateObj);
}

/**
 * Formatea una fecha a formato largo (01 de enero de 2024)
 */
export function formatDateLong(
  date: Date | string | number,
  locale: string = 'es-CO'
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(dateObj);
}

/**
 * Formatea una fecha con hora completa (14/6/2024 - 16:16:00)
 */
export function formatDateTime(
  date: Date | string | number,
  locale: string = 'es-CO'
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(dateObj).replace(',', ' -');
}

/**
 * Formatea solo la hora (16:16:00)
 */
export function formatTime(
  date: Date | string | number,
  hour12: boolean = false,
  locale: string = 'es-CO'
): string {
  const dateObj = date instanceof Date ? date : new Date(date);
  
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12,
  }).format(dateObj);
}
