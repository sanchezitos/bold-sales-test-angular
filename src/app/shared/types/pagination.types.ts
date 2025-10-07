/**
 * Tipos relacionados con paginación
 */

/**
 * Estado de paginación
 */
export interface PaginationState {
  /** Página actual (1-indexed) */
  currentPage: number;
  
  /** Total de páginas */
  totalPages: number;
  
  /** Elementos por página */
  pageSize: number;
  
  /** Total de elementos */
  totalItems: number;
}

/**
 * Configuración de paginación
 */
export interface PaginationConfig {
  /** Elementos por página */
  pageSize?: number;
  
  /** Página inicial (default: 1) */
  initialPage?: number;
  
  /** Opciones de tamaño de página */
  pageSizeOptions?: number[];
}

/**
 * Resultado del hook de paginación
 */
export interface UsePaginationResult<T> extends PaginationState {
  /** Elementos de la página actual */
  paginatedItems: T[];
  
  /** Ir a la página siguiente */
  nextPage: () => void;
  
  /** Ir a la página anterior */
  previousPage: () => void;
  
  /** Ir a una página específica */
  goToPage: (page: number) => void;
  
  /** Cambiar el tamaño de página */
  setPageSize: (size: number) => void;
  
  /** Puede ir a la página anterior */
  canPreviousPage: boolean;
  
  /** Puede ir a la página siguiente */
  canNextPage: boolean;
}

/**
 * Rango de elementos visibles
 */
export interface PaginationRange {
  start: number;
  end: number;
  total: number;
}
