import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../atoms/icon/icon.component';
import { TransactionStatusIconComponent } from '../../atoms/transaction-status-icon/transaction-status-icon.component';

export type TransactionStatus = 'successful' | 'pending' | 'failed';
export type TransactionPaymentMethod = 'card' | 'pse' | 'nequi' | 'bancolombia' | 'daviplata';

export interface Transaction {
  id: string;
  status: TransactionStatus;
  paymentMethod: TransactionPaymentMethod;
  salesType: 'terminal' | 'payment_link';
  createdAt: number; // timestamp
  transactionReference: string;
  amount: number;
  franchise?: string; // Últimos dígitos de tarjeta (opcional)
  deduction?: number; // Monto de deducción Bold (opcional)
}

@Component({
  selector: 'app-transaction-detail-panel',
  standalone: true,
  imports: [CommonModule, IconComponent, TransactionStatusIconComponent],
  templateUrl: './transaction-detail-panel.component.html',
  styleUrls: ['./transaction-detail-panel.component.scss']
})
export class TransactionDetailPanelComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() transaction: Transaction | null = null;

  @Output() close = new EventEmitter<void>();

  copied = false;
  private copyTimeout?: number;

  ngOnInit(): void {
    if (this.isOpen) {
      this.lockBodyScroll();
    }
  }

  ngOnDestroy(): void {
    this.unlockBodyScroll();
    if (this.copyTimeout) {
      clearTimeout(this.copyTimeout);
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    if (this.isOpen) {
      this.onClose();
    }
  }

  onClose(): void {
    this.unlockBodyScroll();
    this.close.emit();
  }

  onOverlayClick(): void {
    this.onClose();
  }

  private lockBodyScroll(): void {
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    document.body.style.overflow = '';
  }

  // Helper methods
  getStatusColor(): string {
    if (!this.transaction) return '#6B7280';
    
    const colors = {
      successful: '#10B981',
      pending: '#F59E0B', 
      failed: '#EF4444'
    };
    return colors[this.transaction.status] || '#6B7280';
  }

  getStatusTitle(): string {
    if (!this.transaction) return '';
    
    const titles = {
      successful: 'Transacción exitosa',
      pending: 'Transacción pendiente',
      failed: 'Transacción fallida'
    };
    return titles[this.transaction.status] || '';
  }

  getStatusIcon(): string {
    if (!this.transaction) return 'alert-circle';
    
    const icons = {
      successful: 'success-trx',
      pending: 'clock',
      failed: 'decline-trx'
    };
    return icons[this.transaction.status] || 'alert-circle';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  }

  formatDateTime(timestamp: number): string {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('es-CO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }

  getPaymentMethodLogo(): string {
    if (!this.transaction) return '/images/visa.svg';
    
    const { paymentMethod, franchise } = this.transaction;
    
    // Para tarjetas, usar el logo de la franquicia si está disponible
    if (paymentMethod === 'card') {
      if (franchise) {
        const franchiseLower = franchise.toLowerCase();
        const franchiseMap: Record<string, string> = {
          'visa': 'visa',
          'mastercard': 'mc',
          'amex': 'amex',
          'diners': 'diners',
        };
        
        const logoName = franchiseMap[franchiseLower];
        if (logoName) {
          return `/images/${logoName}.svg`;
        }
      }
      return '/images/visa.svg';
    }
    
    // Para otros métodos de pago
    const methodLogos: Record<TransactionPaymentMethod, string> = {
      card: '/images/visa.svg',
      pse: '/images/pse.svg',
      nequi: '/images/nequi.svg',
      bancolombia: '/images/bancolombia.svg',
      daviplata: '/images/daviplata.svg',
    };
    
    return methodLogos[paymentMethod] || '/images/visa.svg';
  }

  getPaymentMethodDisplay(): string {
    if (!this.transaction) return '';
    
    const { paymentMethod, franchise } = this.transaction;
    
    if (paymentMethod === 'card') {
      // Si franchise existe y es solo dígitos (4 caracteres numéricos), usarlo
      if (franchise && /^\d{4}$/.test(franchise)) {
        return `**** ${franchise}`;
      } else {
        // Generar dígitos aleatorios
        const digits = Math.floor(Math.random() * 9000 + 1000).toString();
        return `**** ${digits}`;
      }
    }
    
    // Para otros métodos, mostrar nombre amigable
    const methodNames: Record<TransactionPaymentMethod, string> = {
      card: 'Tarjeta',
      pse: 'PSE',
      nequi: 'Nequi',
      bancolombia: 'Bancolombia',
      daviplata: 'Daviplata',
    };
    
    return methodNames[paymentMethod] || paymentMethod;
  }

  formatSalesType(): string {
    if (!this.transaction) return '';
    
    const types = {
      terminal: 'Terminal',
      payment_link: 'Link de pago'
    };
    return types[this.transaction.salesType] || '';
  }

  async handleCopy(): Promise<void> {
    if (!this.transaction) return;
    
    try {
      await navigator.clipboard.writeText(this.transaction.transactionReference);
      this.copied = true;
      
      if (this.copyTimeout) {
        clearTimeout(this.copyTimeout);
      }
      
      this.copyTimeout = window.setTimeout(() => {
        this.copied = false;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  }
}
