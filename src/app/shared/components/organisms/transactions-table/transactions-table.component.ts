import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent, ColumnDef } from '../../molecules/data-table/data-table.component';
import { TransactionCardComponent, Transaction } from '../../molecules/transaction-card/transaction-card.component';
import { GradientHeaderComponent } from '../../molecules';
import {
  TransactionStatusCellComponent,
  DateTimeCellComponent,
  PaymentMethodCellComponent,
  TransactionIdCellComponent,
  AmountCellComponent
} from '../../molecules/table-cells';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [
    CommonModule, 
    DataTableComponent, 
    TransactionCardComponent, 
    GradientHeaderComponent,
    TransactionStatusCellComponent,
    DateTimeCellComponent,
    PaymentMethodCellComponent,
    TransactionIdCellComponent,
    AmountCellComponent
  ],
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss']
})
export class TransactionsTableComponent {
  @Input() transactions: Transaction[] | null = null;
  @Input() onTransactionClickHandler?: (transaction: Transaction) => void;
  @Input() showDeductions = true;
  @Input() title?: string;

  @Output() transactionClick = new EventEmitter<Transaction>();

  // Computed properties
  showTable = computed(() => {
    return window.innerWidth >= 768; // md breakpoint
  });

  // Helper functions
  getRowKeyFn = (row: Transaction) => row.id;
  showRowBorderFn = (row: Transaction, index: number) => index % 2 === 0;
  trackByFn = (index: number, item: Transaction) => item.id;

  // Table columns definition
  tableColumns: ColumnDef<Transaction>[] = [
    {
      key: 'status',
      label: 'Transacción',
      render: (row: Transaction) => this.renderTransactionStatus(row),
      align: 'left'
    },
    {
      key: 'createdAt',
      label: 'Fecha y Hora',
      render: (row: Transaction) => this.renderDateTime(row.createdAt),
      align: 'left'
    },
    {
      key: 'paymentMethod',
      label: 'Método de Pago',
      render: (row: Transaction) => this.renderPaymentMethod(row),
      align: 'left'
    },
    {
      key: 'transactionReference',
      label: 'ID Transacción',
      render: (row: Transaction) => this.renderTransactionId(row.transactionReference),
      align: 'left'
    },
    {
      key: 'amount',
      label: 'Monto',
      render: (row: Transaction) => this.renderAmount(row),
      align: 'left'
    }
  ];

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

  // Render methods for table cells
  renderTransactionStatus(row: Transaction): string {
    const type = row.salesType === 'payment_link' ? 'link' : 'terminal';
    const status = this.getTransactionStatusTitle(row.status);
    const icon = type === 'link' ? '🔗' : '💳';
    
    return `
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <span style="color: var(--bold-blue); font-size: 1rem;">${icon}</span>
        <span style="color: var(--bold-blue); font-size: 0.875rem; font-weight: 500;">${status}</span>
      </div>
    `;
  }

  renderDateTime(timestamp: number): string {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }

  renderPaymentMethod(row: Transaction): string {
    const logo = this.getPaymentMethodLogo(row.paymentMethod, row.franchise);
    const display = this.getPaymentMethodDisplay(row.paymentMethod, row.franchise);
    
    return `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <img src="${logo}" alt="${row.paymentMethod}" style="width: 1.5rem; height: 1rem; object-fit: contain;">
        <span style="font-size: 0.875rem; color: var(--foreground);">${display}</span>
      </div>
    `;
  }

  renderTransactionId(id: string): string {
    return `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <span style="font-family: monospace; font-size: 0.75rem; font-weight: 600; color: var(--foreground-secondary);">${id}</span>
        <button onclick="navigator.clipboard.writeText('${id}')" style="background: none; border: none; cursor: pointer; color: var(--foreground-muted);">📋</button>
      </div>
    `;
  }

  renderAmount(row: Transaction): string {
    const amount = this.formatCurrency(row.amount);
    const deduction = this.showDeductions && row.deduction && row.deduction > 0 
      ? `<div style="font-size: 0.75rem; color: var(--bold-red); font-weight: 500;">- ${this.formatCurrency(row.deduction)}</div>`
      : '';
    
    return `
      <div style="text-align: left;">
        <div style="font-size: 1rem; font-weight: 600; color: var(--bold-blue);">${amount}</div>
        ${deduction}
      </div>
    `;
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
}
