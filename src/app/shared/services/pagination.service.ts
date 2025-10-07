import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PaginationState, PaginationConfig, UsePaginationResult, PaginationRange } from '../types/pagination.types';
import { calculateTotalPages, paginateArray, normalizePage, getPaginationRange } from '../utils/pagination';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private currentPageSubject = new BehaviorSubject<number>(1);
  private pageSizeSubject = new BehaviorSubject<number>(10);
  private itemsSubject = new BehaviorSubject<any[]>([]);

  // Observables públicos
  public currentPage$ = this.currentPageSubject.asObservable();
  public pageSize$ = this.pageSizeSubject.asObservable();
  public items$ = this.itemsSubject.asObservable();

  // Estado de paginación
  public paginationState$: Observable<PaginationState> = combineLatest([
    this.items$,
    this.currentPage$,
    this.pageSize$
  ]).pipe(
    map(([items, currentPage, pageSize]) => {
      const totalItems = items.length;
      const totalPages = calculateTotalPages(totalItems, pageSize);
      const normalizedPage = normalizePage(currentPage, totalPages);
      
      return {
        currentPage: normalizedPage,
        totalPages: totalPages || 1,
        pageSize,
        totalItems
      };
    })
  );

  // Elementos paginados
  public paginatedItems$: Observable<any[]> = combineLatest([
    this.items$,
    this.paginationState$
  ]).pipe(
    map(([items, state]) => {
      return paginateArray(items, state.currentPage, state.pageSize);
    })
  );

  // Estado de navegación
  public navigationState$: Observable<{ canPreviousPage: boolean; canNextPage: boolean }> = 
    this.paginationState$.pipe(
      map(state => ({
        canPreviousPage: state.currentPage > 1,
        canNextPage: state.currentPage < state.totalPages
      }))
    );

  // Rango de elementos
  public range$: Observable<PaginationRange> = this.paginationState$.pipe(
    map(state => getPaginationRange(state.currentPage, state.pageSize, state.totalItems))
  );

  constructor() {}

  /**
   * Configura la paginación con nuevos items
   */
  setItems<T>(items: T[]): void {
    this.itemsSubject.next(items);
  }

  /**
   * Configura la paginación
   */
  configure(config: PaginationConfig): void {
    if (config.pageSize) {
      this.pageSizeSubject.next(config.pageSize);
    }
    if (config.initialPage) {
      this.currentPageSubject.next(config.initialPage);
    }
  }

  /**
   * Va a la página siguiente
   */
  nextPage(): void {
    const currentPage = this.currentPageSubject.value;
    const items = this.itemsSubject.value;
    const pageSize = this.pageSizeSubject.value;
    const totalPages = calculateTotalPages(items.length, pageSize);
    
    if (currentPage < totalPages) {
      this.currentPageSubject.next(currentPage + 1);
    }
  }

  /**
   * Va a la página anterior
   */
  previousPage(): void {
    const currentPage = this.currentPageSubject.value;
    
    if (currentPage > 1) {
      this.currentPageSubject.next(currentPage - 1);
    }
  }

  /**
   * Va a una página específica
   */
  goToPage(page: number): void {
    const items = this.itemsSubject.value;
    const pageSize = this.pageSizeSubject.value;
    const totalPages = calculateTotalPages(items.length, pageSize);
    const validPage = normalizePage(page, totalPages);
    
    this.currentPageSubject.next(validPage);
  }

  /**
   * Cambia el tamaño de página
   */
  setPageSize(size: number): void {
    this.pageSizeSubject.next(size);
    
    // Recalcular página actual para mantener contexto
    const items = this.itemsSubject.value;
    const newTotalPages = calculateTotalPages(items.length, size);
    const currentPage = this.currentPageSubject.value;
    
    if (currentPage > newTotalPages) {
      this.currentPageSubject.next(newTotalPages || 1);
    }
  }

  /**
   * Obtiene el estado actual de paginación
   */
  getCurrentState(): PaginationState {
    const items = this.itemsSubject.value;
    const currentPage = this.currentPageSubject.value;
    const pageSize = this.pageSizeSubject.value;
    const totalItems = items.length;
    const totalPages = calculateTotalPages(totalItems, pageSize);
    const normalizedPage = normalizePage(currentPage, totalPages);
    
    return {
      currentPage: normalizedPage,
      totalPages: totalPages || 1,
      pageSize,
      totalItems
    };
  }

  /**
   * Obtiene los elementos de la página actual
   */
  getCurrentItems<T>(): T[] {
    const items = this.itemsSubject.value;
    const state = this.getCurrentState();
    return paginateArray(items, state.currentPage, state.pageSize);
  }
}
