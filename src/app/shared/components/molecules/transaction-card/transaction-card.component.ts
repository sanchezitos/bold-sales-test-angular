import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Transaction {
  id: string;
  transactionReference: string;
  amount: number;
  deduction?: number;
  status: 'successful' | 'pending' | 'failed';
  paymentMethod: string;
  franchise?: string;
  salesType: 'payment_link' | 'terminal';
  createdAt: string;
}

@Component({
  selector: 'app-transaction-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-card.component.html',
  styleUrls: ['./transaction-card.component.scss']
})
export class TransactionCardComponent {
  @Input() transaction!: Transaction;
  @Input() showDeduction = true;
  @Input() clickable = true;

  @Output() cardClick = new EventEmitter<Transaction>();

  onCardClick(): void {
    if (this.clickable) {
      this.cardClick.emit(this.transaction);
    }
  }

  // Status methods
  getStatusTitle(): string {
    switch (this.transaction.status) {
      case 'successful':
        return '¡Cobro exitoso!';
      case 'pending':
        return 'Pendiente';
      case 'failed':
        return 'Fallido';
      default:
        return 'Desconocido';
    }
  }

  getStatusColor(): string {
    switch (this.transaction.status) {
      case 'successful':
        return 'var(--success)';
      case 'pending':
        return 'var(--warning)';
      case 'failed':
        return 'var(--danger)';
      default:
        return 'var(--foreground-secondary)';
    }
  }

  getStatusIcon(): string {
    switch (this.transaction.status) {
      case 'successful':
        return '✓';
      case 'pending':
        return '⏳';
      case 'failed':
        return '✗';
      default:
        return '?';
    }
  }

  // Payment method methods
  getPaymentMethodLogo(): string {
    const method = this.transaction.paymentMethod.toLowerCase();
    const franchise = this.transaction.franchise?.toLowerCase();
    
    if (method === 'card') {
      if (franchise === 'visa') return '/images/payment-methods/visa.svg';
      if (franchise === 'mastercard') return '/images/payment-methods/mc.svg';
      if (franchise === 'amex') return '/images/payment-methods/amex.svg';
      return '/images/payment-methods/visa.svg'; // default
    }
    
    if (method === 'nequi') return '/images/payment-methods/nequi.svg';
    if (method === 'pse') return '/images/payment-methods/pse.svg';
    if (method === 'bancolombia') return '/images/payment-methods/bancolombia.svg';
    if (method === 'daviplata') return '/images/payment-methods/daviplata.svg';
    
    return '/images/payment-methods/visa.svg'; // fallback
  }

  getPaymentMethodDisplay(): string {
    const method = this.transaction.paymentMethod.toLowerCase();
    const franchise = this.transaction.franchise;
    
    if (method === 'card' && franchise) {
      return `**** 2282`; // Simular número de tarjeta enmascarado
    }
    
    return this.transaction.paymentMethod.charAt(0).toUpperCase() + this.transaction.paymentMethod.slice(1);
  }

  // Sales type methods
  getSalesTypeIcon(): string {
    return this.transaction.salesType === 'payment_link' ? '🔗' : '💳';
  }

  getSalesTypeText(): string {
    return this.transaction.salesType === 'payment_link' ? 'Link de pago' : 'Datáfono terminal';
  }

  // Formatting methods
  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('COP', '$');
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  }
}