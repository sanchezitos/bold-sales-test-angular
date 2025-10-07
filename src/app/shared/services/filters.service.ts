import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filters, FiltersState, DateFilter, SalesType, PaymentMethod } from '../types/filters.types';
import { FILTERS_STORAGE_KEY } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private filtersSubject = new BehaviorSubject<FiltersState>({
    dateFilter: 'all',
    paymentMethods: [],
    salesTypes: [],
    searchQuery: '',
    isInitialized: false
  });

  public filters$ = this.filtersSubject.asObservable();

  // Observable para el contador de filtros activos
  public activeFiltersCount$ = this.filters$.pipe(
    map(filters => {
      let count = 0;
      
      // Contar tipos de venta (solo si no es "Ver todos")
      if (filters.salesTypes.length > 0) {
        count += filters.salesTypes.length;
      }
      
      // Contar métodos de pago
      count += filters.paymentMethods.length;
      
      // Contar filtro de fecha (solo si no es "all")
      if (filters.dateFilter !== 'all') {
        count += 1;
      }
      
      return count;
    })
  );

  constructor() {
    this.initializeFilters();
  }

  /**
   * Inicializa los filtros desde localStorage
   */
  private initializeFilters(): void {
    const loadedFilters = this.loadFiltersFromStorage();
    this.filtersSubject.next(loadedFilters);
  }

  /**
   * Carga los filtros desde localStorage
   */
  private loadFiltersFromStorage(): FiltersState {
    if (typeof window === 'undefined') {
      return this.getDefaultState();
    }

    try {
      const stored = localStorage.getItem(FILTERS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return { ...parsed, isInitialized: true };
      }
    } catch (error) {
      console.error('Error loading filters from localStorage:', error);
    }

    return { ...this.getDefaultState(), isInitialized: true };
  }

  /**
   * Guarda los filtros en localStorage
   */
  private saveFiltersToStorage(filters: FiltersState): void {
    if (typeof window === 'undefined') return;

    try {
      const { isInitialized, ...filtersToSave } = filters;
      localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(filtersToSave));
    } catch (error) {
      console.error('Error saving filters to localStorage:', error);
    }
  }

  /**
   * Obtiene el estado por defecto
   */
  private getDefaultState(): FiltersState {
    return {
      dateFilter: 'all',
      paymentMethods: [],
      salesTypes: [],
      searchQuery: '',
      isInitialized: false
    };
  }

  /**
   * Actualiza los filtros y los guarda
   */
  private updateFilters(updates: Partial<Filters>): void {
    const currentFilters = this.filtersSubject.value;
    const newFilters = { ...currentFilters, ...updates };
    this.filtersSubject.next(newFilters);
    this.saveFiltersToStorage(newFilters);
  }

  /**
   * Actualiza el filtro de fecha
   */
  setDateFilter(dateFilter: DateFilter): void {
    this.updateFilters({ dateFilter });
  }

  /**
   * Actualiza los tipos de venta seleccionados
   */
  setSalesTypes(salesTypes: SalesType[]): void {
    this.updateFilters({ salesTypes });
  }

  /**
   * Actualiza los métodos de pago seleccionados
   */
  setPaymentMethods(paymentMethods: PaymentMethod[]): void {
    this.updateFilters({ paymentMethods });
  }

  /**
   * Agrega o quita un método de pago
   */
  togglePaymentMethod(method: PaymentMethod): void {
    const currentFilters = this.filtersSubject.value;
    const currentMethods = [...currentFilters.paymentMethods];
    const index = currentMethods.indexOf(method);

    if (index > -1) {
      currentMethods.splice(index, 1);
    } else {
      currentMethods.push(method);
    }

    this.updateFilters({ paymentMethods: currentMethods });
  }

  /**
   * Actualiza la búsqueda
   */
  setSearchQuery(searchQuery: string): void {
    this.updateFilters({ searchQuery });
  }

  /**
   * Toggle tipo de venta (datáfono/link)
   */
  toggleSalesType(type: SalesType): void {
    const currentFilters = this.filtersSubject.value;
    const currentTypes = [...currentFilters.salesTypes];
    const index = currentTypes.indexOf(type);

    if (index > -1) {
      currentTypes.splice(index, 1);
    } else {
      currentTypes.push(type);
    }

    this.updateFilters({ salesTypes: currentTypes });
  }

  /**
   * Limpiar tipos de venta (selecciona "Ver todos")
   */
  clearSalesTypes(): void {
    this.updateFilters({ salesTypes: [] });
  }

  /**
   * Limpiar métodos de pago
   */
  clearPaymentMethods(): void {
    this.updateFilters({ paymentMethods: [] });
  }

  /**
   * Limpia todos los filtros
   */
  clearFilters(): void {
    const defaultFilters = this.getDefaultState();
    this.filtersSubject.next({ ...defaultFilters, isInitialized: true });
    this.saveFiltersToStorage({ ...defaultFilters, isInitialized: true });
  }

  /**
   * Obtiene el estado actual de los filtros
   */
  getCurrentFilters(): FiltersState {
    return this.filtersSubject.value;
  }

  /**
   * Cuenta cuántos filtros están activos
   */
  getActiveFiltersCount(): number {
    const { salesTypes, paymentMethods, dateFilter } = this.filtersSubject.value;
    
    let count = 0;
    
    // Contar tipos de venta (solo si no es "Ver todos")
    if (salesTypes.length > 0) {
      count += salesTypes.length;
    }
    
    // Contar métodos de pago
    count += paymentMethods.length;
    
    // Contar filtro de fecha (solo si no es "all")
    if (dateFilter !== 'all') {
      count += 1;
    }
    
    return count;
  }

  /**
   * Verifica si hay filtros activos
   */
  hasActiveFilters(): boolean {
    return this.getActiveFiltersCount() > 0;
  }
}
