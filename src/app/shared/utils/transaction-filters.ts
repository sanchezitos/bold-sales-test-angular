/**
 * Utilidades para filtrar transacciones
 */

import { Transaction, PaymentMethod } from '../types/transaction.types';
import { Filters, SalesType, DateFilter } from '../types/filters.types';

/**
 * Formatea el status de una transacción para mostrar
 */
export function formatTransactionStatus(status: Transaction['status']): string {
  const statusMap = {
    successful: 'Cobro exitoso',
    pending: 'Cobro pendiente',
    failed: 'Cobro no realizado',
  };
  
  return statusMap[status] || status;
}

/**
 * Formatea el tipo de venta para mostrar
 */
export function formatSalesType(salesType: Transaction['salesType']): string {
  const typeMap = {
    terminal: 'Datáfono terminal',
    payment_link: 'Link de pago',
  };
  
  return typeMap[salesType] || salesType;
}

/**
 * Formatea una fecha para mostrar
 */
export function formatDateTime(timestamp: number): string {
  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

/**
 * Formatea un monto a formato de moneda
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Filtra transacciones por tipo de venta
 */
export function filterBySalesType(
  transactions: Transaction[],
  salesTypes: SalesType[]
): Transaction[] {
  if (salesTypes.length === 0) return transactions;
  
  return transactions.filter(tx => salesTypes.includes(tx.salesType));
}

/**
 * Filtra transacciones por métodos de pago
 */
export function filterByPaymentMethod(
  transactions: Transaction[],
  paymentMethods: PaymentMethod[]
): Transaction[] {
  if (paymentMethods.length === 0) return transactions;
  
  return transactions.filter(tx => paymentMethods.includes(tx.paymentMethod));
}

/**
 * Filtra transacciones por un query de búsqueda
 * Busca en todas las columnas visibles de la tabla
 */
export function filterTransactionsByQuery(
  transactions: Transaction[],
  query: string
): Transaction[] {
  if (!query || query.trim() === '') {
    return transactions;
  }

  const normalizedQuery = query.toLowerCase().trim();

  return transactions.filter((tx) => {
    // Formatear datos para búsqueda
    const statusText = formatTransactionStatus(tx.status).toLowerCase();
    const salesTypeText = formatSalesType(tx.salesType).toLowerCase();
    const formattedDate = formatDateTime(tx.createdAt).toLowerCase();
    const formattedAmount = formatCurrency(tx.amount).toLowerCase();

    // Buscar en todas las columnas
    return (
      // Columna 1: Estado y tipo de transacción
      statusText.includes(normalizedQuery) ||
      salesTypeText.includes(normalizedQuery) ||
      tx.status.toLowerCase().includes(normalizedQuery) ||
      tx.salesType.toLowerCase().includes(normalizedQuery) ||
      
      // Columna 2: Fecha y hora
      formattedDate.includes(normalizedQuery) ||
      
      // Columna 3: Método de pago y últimos dígitos
      tx.paymentMethod.toLowerCase().includes(normalizedQuery) ||
      (tx.franchise && tx.franchise.toLowerCase().includes(normalizedQuery)) ||
      
      // Columna 4: ID de transacción
      tx.transactionReference.toLowerCase().includes(normalizedQuery) ||
      
      // Columna 5: Monto y deducción
      tx.amount.toString().includes(normalizedQuery) ||
      formattedAmount.includes(normalizedQuery) ||
      (tx.deduction && tx.deduction.toString().includes(normalizedQuery))
    );
  });
}

/**
 * Filtra transacciones por rango de fecha
 * Nota: Calcula fechas basándose en las transacciones más recientes,
 * no en la fecha actual del sistema (para manejar APIs con datos mock/futuros)
 */
export function filterByDate(
  transactions: Transaction[],
  dateFilter: DateFilter
): Transaction[] {
  if (dateFilter === 'all') return transactions;
  if (transactions.length === 0) return transactions;

  // Encontrar la fecha más reciente en las transacciones
  const mostRecentTimestamp = Math.max(...transactions.map(t => t.createdAt));
  const referenceDate = new Date(mostRecentTimestamp);
  const today = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );

  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.createdAt);

    switch (dateFilter) {
      case 'today':
        // Transacciones del día más reciente
        return transactionDate >= today;

      case 'week': {
        // Últimos 7 días desde la fecha más reciente
        const weekStart = new Date(today);
        weekStart.setDate(today.getDate() - 7);
        return transactionDate >= weekStart;
      }

      case 'september': {
        // Mes de septiembre del año de referencia
        const year = referenceDate.getFullYear();
        const septemberStart = new Date(year, 8, 1); // Septiembre = mes 8 (0-indexed)
        const septemberEnd = new Date(year, 9, 1); // Octubre = mes 9
        return transactionDate >= septemberStart && transactionDate < septemberEnd;
      }

      default:
        return true;
    }
  });
}

/**
 * Aplica todos los filtros a un array de transacciones
 * Combina: salesTypes, paymentMethods, searchQuery
 */
export function applyAllFilters(
  transactions: Transaction[],
  filters: Filters
): Transaction[] {
  let result = transactions;

  // Filtrar por tipo de venta (datáfono/link)
  if (filters.salesTypes.length > 0) {
    result = filterBySalesType(result, filters.salesTypes);
  }

  // Filtrar por métodos de pago
  if (filters.paymentMethods.length > 0) {
    result = filterByPaymentMethod(result, filters.paymentMethods);
  }

  // Filtrar por búsqueda
  if (filters.searchQuery) {
    result = filterTransactionsByQuery(result, filters.searchQuery);
  }

  return result;
}
