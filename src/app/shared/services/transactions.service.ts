import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ApiService } from './api.service';
import { FiltersService } from './filters.service';
import { Transaction, TransactionResponse } from '../types/transaction.types';
import { DateFilter } from '../types/filters.types';
import { filterByDate, applyAllFilters } from '../utils/transaction-filters';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  // Observables públicos
  public transactions$ = this.transactionsSubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();
  public filters$: Observable<any>;
  public filteredTransactions$: Observable<Transaction[]>;
  public total$: Observable<number>;

  constructor(
    private apiService: ApiService,
    private filtersService: FiltersService
  ) {
    // Initialize filters observable after constructor
    this.filters$ = this.filtersService.filters$;
    
    // Initialize filtered transactions observable
    this.filteredTransactions$ = combineLatest([
      this.transactions$,
      this.filters$
    ]).pipe(
      map(([transactions, filters]) => {
        // Aplicar filtro de fecha primero
        let filtered = filterByDate(transactions, filters.dateFilter);
        
        // Aplicar el resto de filtros
        filtered = applyAllFilters(filtered, filters);
        
        return filtered;
      }),
      shareReplay(1)
    );

    // Initialize total observable
    this.total$ = this.filteredTransactions$.pipe(
      map(transactions => transactions.reduce((sum, t) => sum + t.amount, 0))
    );
    
    this.loadTransactions();
  }

  /**
   * Carga las transacciones desde la API
   */
  loadTransactions(): void {
    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);

    this.apiService.fetchTransactions().subscribe({
      next: (response: TransactionResponse) => {
        this.transactionsSubject.next(response.data);
        this.isLoadingSubject.next(false);
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
        this.errorSubject.next(error.message || 'Error al cargar las transacciones');
        this.isLoadingSubject.next(false);
      }
    });
  }

  /**
   * Actualiza el filtro de fecha
   */
  updateDateFilter(dateFilter: DateFilter): void {
    this.filtersService.setDateFilter(dateFilter);
  }

  /**
   * Actualiza los tipos de venta
   */
  updateSalesTypes(salesTypes: string[]): void {
    this.filtersService.setSalesTypes(salesTypes as any[]);
  }

  /**
   * Actualiza los métodos de pago
   */
  updatePaymentMethods(paymentMethods: string[]): void {
    this.filtersService.setPaymentMethods(paymentMethods as any[]);
  }

  /**
   * Actualiza la búsqueda
   */
  updateSearchQuery(searchQuery: string): void {
    this.filtersService.setSearchQuery(searchQuery);
  }

  /**
   * Limpia todos los filtros
   */
  clearFilters(): void {
    this.filtersService.clearFilters();
  }

  /**
   * Recarga las transacciones
   */
  refetch(): void {
    this.loadTransactions();
  }
}
