/**
 * Utilidades para paginación
 * Lógica de negocio pura
 */

import { PaginationRange } from '../types/pagination.types';

/**
 * Calcula el total de páginas
 */
export function calculateTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

/**
 * Obtiene los elementos de una página específica
 */
export function paginateArray<T>(
  items: T[],
  page: number,
  pageSize: number
): T[] {
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  return items.slice(startIndex, endIndex);
}

/**
 * Normaliza un número de página (asegura que esté en rango válido)
 */
export function normalizePage(page: number, totalPages: number): number {
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
}

/**
 * Obtiene el rango de elementos visibles
 * Ejemplo: "Mostrando 1-10 de 50"
 */
export function getPaginationRange(
  currentPage: number,
  pageSize: number,
  totalItems: number
): PaginationRange {
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  
  return {
    start: totalItems === 0 ? 0 : start,
    end,
    total: totalItems,
  };
}
