import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { AppState } from '../../../store/app.state';
import * as FiltersActions from '../../filters/store/filters.actions';

// Import atoms components
import {
  ButtonComponent,
  InputComponent,
  CardComponent,
  BadgeComponent,
  SkeletonTextComponent,
  SkeletonCircleComponent,
  SkeletonRectComponent
} from '../../../shared/components/atoms';

// Import molecules components
import {
  SearchBarComponent,
  FilterButtonComponent,
  TransactionCardComponent,
  SkeletonCardComponent,
  SkeletonTableComponent,
  AmountDisplayComponent,
  GradientHeaderComponent,
  DateLabelComponent,
  DataTableComponent,
  PaginationComponent,
  TabGroupComponent
} from '../../../shared/components/molecules';

// Import organisms components
import {
  SalesSummaryCardComponent,
  TransactionsTableComponent
} from '../../../shared/components/organisms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    InputComponent,
    CardComponent,
    BadgeComponent,
    SkeletonTextComponent,
    SkeletonCircleComponent,
    SkeletonRectComponent,
    SearchBarComponent,
    FilterButtonComponent,
    TransactionCardComponent,
    SkeletonCardComponent,
    SkeletonTableComponent,
    AmountDisplayComponent,
    GradientHeaderComponent,
    DateLabelComponent,
    DataTableComponent,
    PaginationComponent,
    TabGroupComponent,
    SalesSummaryCardComponent,
    TransactionsTableComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  showComponents = false;
  currentDate = new Date();
  searchValue = '';

  // Demo data for molecules
  filterOptions = [
    { value: 'card', label: 'Tarjeta', count: 15 },
    { value: 'nequi', label: 'Nequi', count: 8 },
    { value: 'pse', label: 'PSE', count: 12 },
    { value: 'cash', label: 'Efectivo', count: 3 }
  ];

  selectedFilters: string[] = ['card'];

  // TabGroup demo data
  tabItems = [
    { id: 'today', label: 'Hoy' },
    { id: 'week', label: 'Esta semana' },
    { id: 'month', label: 'Este mes' }
  ];
  activeTab = 'today';

  sampleTransaction = {
    id: '1',
    transactionReference: 'TXN-001',
    amount: 150000,
    deduction: 5000,
    status: 'successful' as const,
    paymentMethod: 'card',
    franchise: 'visa',
    salesType: 'terminal' as const,
    createdAt: '2025-10-04T22:15:08Z'
  };

  // DataTable demo data
  tableData = [
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', amount: 150000, status: 'successful', date: '2024-10-06' },
    { id: 2, name: 'María García', email: 'maria@email.com', amount: 250000, status: 'pending', date: '2024-10-05' },
    { id: 3, name: 'Carlos López', email: 'carlos@email.com', amount: 75000, status: 'failed', date: '2024-10-04' },
    { id: 4, name: 'Ana Rodríguez', email: 'ana@email.com', amount: 300000, status: 'successful', date: '2024-10-03' }
  ];

  tableColumns = [
    { 
      key: 'id', 
      label: 'ID', 
      render: (row: any) => row.id.toString(),
      align: 'left' as const
    },
    { 
      key: 'name', 
      label: 'Nombre', 
      render: (row: any) => row.name,
      align: 'left' as const
    },
    { 
      key: 'email', 
      label: 'Email', 
      render: (row: any) => row.email,
      align: 'left' as const
    },
    { 
      key: 'amount', 
      label: 'Monto', 
      render: (row: any) => this.formatCurrency(row.amount),
      align: 'right' as const
    },
    { 
      key: 'status', 
      label: 'Estado', 
      render: (row: any) => this.getStatusBadge(row.status),
      align: 'center' as const
    },
    { 
      key: 'date', 
      label: 'Fecha', 
      render: (row: any) => row.date,
      align: 'center' as const
    }
  ];

  // Sample transactions data
  sampleTransactions = [
    {
      id: '1',
      transactionReference: 'TXN-001',
      amount: 150000,
      deduction: 5000,
      status: 'successful' as const,
      paymentMethod: 'card',
      franchise: 'visa',
      salesType: 'terminal' as const,
      createdAt: '2025-10-04T22:15:08Z'
    },
    {
      id: '2',
      transactionReference: 'TXN-002',
      amount: 250000,
      deduction: 7500,
      status: 'pending' as const,
      paymentMethod: 'nequi',
      salesType: 'payment_link' as const,
      createdAt: '2025-10-04T20:30:15Z'
    },
    {
      id: '3',
      transactionReference: 'TXN-003',
      amount: 75000,
      status: 'failed' as const,
      paymentMethod: 'pse',
      salesType: 'terminal' as const,
      createdAt: '2025-10-04T18:45:22Z'
    },
    {
      id: '4',
      transactionReference: 'TXN-004',
      amount: 300000,
      deduction: 10000,
      status: 'successful' as const,
      paymentMethod: 'card',
      franchise: 'mastercard',
      salesType: 'payment_link' as const,
      createdAt: '2025-10-04T16:20:10Z'
    }
  ];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    // Initialize filters when dashboard loads
    this.store.dispatch(FiltersActions.initializeFilters());
  }

  testComponents(): void {
    this.showComponents = !this.showComponents;
  }

  // Demo event handlers
  onSearchChange(query: string): void {
    console.log('Search query:', query);
    this.searchValue = query;
  }

  onFilterToggle(active: boolean): void {
    console.log('Filter toggle:', active);
  }

  onFilterButtonClick(event: Event): void {
    console.log('Filter button clicked:', event);
    // Aquí se abriría el modal de filtros en la implementación real
  }

  onFilterChange(filters: string[]): void {
    console.log('Selected filters:', filters);
    this.selectedFilters = filters;
  }

  onSalesInfoClick(): void {
    console.log('Sales info clicked');
    alert('Información sobre las ventas');
  }

  onGradientHeaderClick(): void {
    console.log('Gradient header info clicked');
    alert('Información del header');
  }

  onTabChange(tabId: string): void {
    console.log('Tab changed to:', tabId);
    this.activeTab = tabId;
   // alert(`Tab seleccionado: ${tabId}`);
  }

  onTransactionClick(transaction: any): void {
    console.log('Transaction clicked:', transaction);
    alert(`Transacción ${transaction.transactionReference} seleccionada`);
  }

  onTableRowClick(event: any): void {
    console.log('Table row clicked:', event);
    alert(`Fila ${event.index + 1} seleccionada: ${event.row.name}`);
  }

  onTableSort(sortConfig: any): void {
    console.log('Table sort changed:', sortConfig);
  }

  onPageChange(page: number): void {
    console.log('Page changed to:', page);
  }

  onPageSizeChange(size: number): void {
    console.log('Page size changed to:', size);
  }

  // Helper methods for DataTable
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('COP', '$');
  }

  getStatusBadge(status: string): string {
    switch (status) {
      case 'successful':
        return '<span style="color: var(--success); font-weight: 600;">✓ Exitoso</span>';
      case 'pending':
        return '<span style="color: var(--warning); font-weight: 600;">⏳ Pendiente</span>';
      case 'failed':
        return '<span style="color: var(--danger); font-weight: 600;">✗ Fallido</span>';
      default:
        return '<span style="color: var(--foreground-secondary);">?</span>';
    }
  }

  // Helper functions for DataTable
  getRowKeyFn = (row: any, index: number) => row.id;
  showRowBorderFn = (row: any, index: number) => index % 2 === 0;
}