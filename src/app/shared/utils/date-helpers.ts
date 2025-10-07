/**
 * Helpers para manejo de fechas y filtros
 * Replica la funcionalidad de date-helpers-i18n.ts de React
 */

export type DateFilter = 'today' | 'week' | 'currentMonth' | 'september' | 'all';

export interface DateRange {
  start: Date;
  end: Date;
}

/**
 * Obtiene el rango de fechas para un filtro específico
 */
export function getDateRangeForFilter(
  filter: DateFilter, 
  mostRecentTimestamp?: number
): DateRange {
  // Usar la fecha más reciente de las transacciones como referencia, o la fecha actual
  const referenceDate = mostRecentTimestamp ? new Date(mostRecentTimestamp) : new Date();
  const today = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), referenceDate.getDate());
  
  switch (filter) {
    case 'today':
      return {
        start: today,
        end: new Date(today.getTime() + 24 * 60 * 60 * 1000 - 1)
      };
    
    case 'week':
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      return {
        start: startOfWeek,
        end: new Date(startOfWeek.getTime() + 7 * 24 * 60 * 60 * 1000 - 1)
      };
    
    case 'currentMonth':
      const startOfMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth(), 1);
      const endOfMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth() + 1, 0, 23, 59, 59, 999);
      return {
        start: startOfMonth,
        end: endOfMonth
      };
    
    case 'september':
      const startOfSeptember = new Date(referenceDate.getFullYear(), 8, 1); // Septiembre es mes 8 (0-indexed)
      const endOfSeptember = new Date(referenceDate.getFullYear(), 9, 0, 23, 59, 59, 999); // Octubre 0 = último día de septiembre
      return {
        start: startOfSeptember,
        end: endOfSeptember
      };
    
    case 'all':
    default:
      // Si hay una fecha más reciente, usar desde esa fecha hasta ahora
      if (mostRecentTimestamp) {
        return {
          start: new Date(mostRecentTimestamp),
          end: referenceDate
        };
      }
      // Si no, usar el último mes
      const lastMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - 1, 1);
      return {
        start: lastMonth,
        end: referenceDate
      };
  }
}

/**
 * Formatea un rango de fechas para mostrar
 */
export function formatDateRange(range: DateRange): string {
  const start = range.start.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short'
  });
  
  const end = range.end.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
  
  return `${start} - ${end}`;
}

/**
 * Obtiene el título dinámico para el SalesSummaryCard
 */
export function getSalesCardTitle(filter: DateFilter): string {
  switch (filter) {
    case 'today':
      return 'Ventas de Hoy';
    case 'week':
      return 'Ventas de Esta Semana';
    case 'currentMonth':
      const now = new Date();
      const monthName = now.toLocaleDateString('es-CO', { month: 'long' });
      return `Ventas de ${monthName.charAt(0).toUpperCase() + monthName.slice(1)}`;
    case 'september':
      return 'Ventas de Septiembre';
    case 'all':
    default:
      return 'Total de Ventas';
  }
}

/**
 * Obtiene el tooltip dinámico para el SalesSummaryCard
 */
export function getSalesCardTooltip(filter: DateFilter): string {
  switch (filter) {
    case 'today':
      return 'Total de ventas del día actual';
    case 'week':
      return 'Total de ventas de la semana actual';
    case 'currentMonth':
      const now = new Date();
      const monthName = now.toLocaleDateString('es-CO', { month: 'long' });
      return `Total de ventas de ${monthName}`;
    case 'september':
      return 'Total de ventas de septiembre';
    case 'all':
    default:
      return 'Total de todas las ventas';
  }
}

/**
 * Obtiene el título dinámico para la tabla de transacciones
 */
export function getTransactionsTableTitle(
  filter: DateFilter, 
  transactionCount: number
): string {
  const count = transactionCount === 1 ? 'transacción' : 'transacciones';
  
  switch (filter) {
    case 'today':
      return `${transactionCount} ${count} de hoy`;
    case 'week':
      return `${transactionCount} ${count} de esta semana`;
    case 'currentMonth':
      const now = new Date();
      const monthName = now.toLocaleDateString('es-CO', { month: 'long' });
      return `${transactionCount} ${count} de ${monthName}`;
    case 'september':
      return `${transactionCount} ${count} de septiembre`;
    case 'all':
    default:
      return `${transactionCount} ${count} en total`;
  }
}

/**
 * Obtiene la fecha a mostrar en el SalesSummaryCard
 */
export function getDisplayDate(filter: DateFilter, range: DateRange): Date {
  switch (filter) {
    case 'today':
      return range.start;
    case 'week':
      return range.start;
    case 'currentMonth':
      return range.start;
    case 'september':
      return range.start;
    case 'all':
    default:
      return new Date();
  }
}
