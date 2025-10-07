import { Component, Input, Output, EventEmitter, computed, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TransactionCardComponent, Transaction } from '../../molecules/transaction-card/transaction-card.component';
import { GradientHeaderComponent, SearchBarComponent, PaginationComponent } from '../../molecules';
import {
  TransactionStatusCellComponent,
  DateTimeCellComponent,
  PaymentMethodCellComponent,
  TransactionIdCellComponent,
  AmountCellComponent
} from '../../molecules/table-cells';
import { PaginationService } from '../../../services/pagination.service';
import { PaginationConfig, PaginationState } from '../../../types/pagination.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [
    CommonModule, 
    TransactionCardComponent, 
    GradientHeaderComponent,
    SearchBarComponent,
    PaginationComponent,
    TransactionStatusCellComponent,
    DateTimeCellComponent,
    PaymentMethodCellComponent,
    TransactionIdCellComponent,
    AmountCellComponent
  ],
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent implements OnInit, OnDestroy, OnChanges {
  private destroy$ = new Subject<void>();

  @Input() transactions: Transaction[] | null = null;
  @Input() onTransactionClickHandler?: (transaction: Transaction) => void;
  @Input() showDeductions = true;
  @Input() title?: string;
  @Input() searchPlaceholder = 'Buscar transacciones...';
  @Input() searchValue = '';
  @Input() showPagination = true;
  @Input() paginationConfig: PaginationConfig = {
    pageSize: 10,
    pageSizeOptions: [10, 20, 50, 100]
  };

  @Output() transactionClick = new EventEmitter<Transaction>();
  @Output() searchChange = new EventEmitter<string>();

  // Pagination observables
  paginatedTransactions$: Observable<Transaction[]>;
  paginationState$: Observable<PaginationState>;
  navigationState$: Observable<{ canPreviousPage: boolean; canNextPage: boolean }>;
  range$: Observable<{ start: number; end: number; total: number }>;

  // Pagination state properties for template
  currentPage = 1;
  totalPages = 1;
  pageSize = 10;
  totalItems = 0;
  canPreviousPage = false;
  canNextPage = false;

  // Computed properties
  showTable = computed(() => {
    return window.innerWidth >= 768; // md breakpoint
  });

  constructor(public paginationService: PaginationService) {
    // Inicializar observables después de la inyección del servicio
    this.paginatedTransactions$ = this.paginationService.paginatedItems$;
    this.paginationState$ = this.paginationService.paginationState$;
    this.navigationState$ = this.paginationService.navigationState$;
    this.range$ = this.paginationService.range$;
  }

  ngOnInit(): void {
    // Configurar paginación
    this.paginationService.configure(this.paginationConfig);

    // Suscribirse a cambios en transactions para actualizar paginación
    if (this.transactions) {
      this.paginationService.setItems(this.transactions);
    }

    // Suscribirse a cambios de estado de paginación
    this.paginationState$.pipe(takeUntil(this.destroy$)).subscribe(state => {
      this.currentPage = state.currentPage;
      this.totalPages = state.totalPages;
      this.pageSize = state.pageSize;
      this.totalItems = state.totalItems;
    });

    this.navigationState$.pipe(takeUntil(this.destroy$)).subscribe(nav => {
      this.canPreviousPage = nav.canPreviousPage;
      this.canNextPage = nav.canNextPage;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] && this.transactions) {
      this.paginationService.setItems(this.transactions);
    }
  }

  // Helper functions
  getRowKeyFn = (row: Transaction) => row.id;
  showRowBorderFn = (row: Transaction, index: number) => index % 2 === 0;
  trackByFn = (index: number, item: Transaction) => item.id;


  // Helper methods for getting cell data
  getTransactionStatusData(row: Transaction) {
    return {
      type: (row.salesType === 'payment_link' ? 'link' : 'terminal') as 'link' | 'terminal',
      status: this.getTransactionStatusTitle(row.status)
    };
  }

  getPaymentMethodData(row: Transaction) {
    return {
      paymentMethod: row.paymentMethod as any,
      franchise: row.franchise
    };
  }

  getAmountData(row: Transaction) {
    return {
      amount: row.amount,
      deduction: this.showDeductions ? row.deduction : undefined,
      align: 'left' as const
    };
  }


  // Helper methods
  getTransactionStatusTitle(status: string): string {
    switch (status) {
      case 'successful':
        return 'Cobro exitoso';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallido';
      default:
        return 'Desconocido';
    }
  }

  getPaymentMethodLogo(method: string, franchise?: string): string {
    const methodLower = method.toLowerCase();
    const franchiseLower = franchise?.toLowerCase();
    
    if (methodLower === 'card') {
      if (franchiseLower === 'visa') return '/images/payment-methods/visa.svg';
      if (franchiseLower === 'mastercard') return '/images/payment-methods/mc.svg';
      if (franchiseLower === 'amex') return '/images/payment-methods/amex.svg';
      return '/images/payment-methods/visa.svg';
    }
    
    if (methodLower === 'nequi') return '/images/payment-methods/nequi.svg';
    if (methodLower === 'pse') return '/images/payment-methods/pse.svg';
    if (methodLower === 'bancolombia') return '/images/payment-methods/bancolombia.svg';
    if (methodLower === 'daviplata') return '/images/payment-methods/daviplata.svg';
    
    return '/images/payment-methods/visa.svg';
  }

  getPaymentMethodDisplay(method: string, franchise?: string): string {
    const methodLower = method.toLowerCase();
    
    if (methodLower === 'card' && franchise) {
      return `**** ${franchise.slice(-4)}`;
    }
    
    return method.charAt(0).toUpperCase() + method.slice(1);
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('COP', '$');
  }

  // Event handlers
  onRowClick(event: { row: Transaction; index: number }): void {
    if (this.onTransactionClickHandler) {
      this.onTransactionClickHandler(event.row);
    }
    this.transactionClick.emit(event.row);
  }

  onTransactionClick(transaction: Transaction): void {
    if (this.onTransactionClickHandler) {
      this.onTransactionClickHandler(transaction);
    }
    this.transactionClick.emit(transaction);
  }

  onSearchChange(value: string): void {
    this.searchChange.emit(value);
  }

  // Pagination methods
  onPageChange(page: number): void {
    this.paginationService.goToPage(page);
  }

  onPageSizeChange(size: number): void {
    this.paginationService.setPageSize(size);
  }

  onPreviousPage(): void {
    this.paginationService.previousPage();
  }

  onNextPage(): void {
    this.paginationService.nextPage();
  }
}
