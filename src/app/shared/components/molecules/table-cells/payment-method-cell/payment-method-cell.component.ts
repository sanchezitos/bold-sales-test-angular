import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethod } from '../../../../types/filters.types';

@Component({
  selector: 'app-payment-method-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-method-cell.component.html',
  styleUrls: ['./payment-method-cell.component.scss']
})
export class PaymentMethodCellComponent {
  @Input() paymentMethod: PaymentMethod = 'card';
  @Input() franchise?: string;

  getPaymentMethodLogo(): string {
    const { paymentMethod, franchise } = this;
    
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
    const methodLogos: Record<PaymentMethod, string> = {
      card: '/images/visa.svg',
      pse: '/images/pse.svg',
      nequi: '/images/nequi.svg',
      bancolombia: '/images/bancolombia.svg',
      daviplata: '/images/daviplata.svg',
    };
    
    return methodLogos[paymentMethod] || '/images/visa.svg';
  }

  getPaymentMethodDisplay(): string {
    const { paymentMethod, franchise } = this;
    
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
    const methodNames: Record<PaymentMethod, string> = {
      card: 'Tarjeta',
      pse: 'PSE',
      nequi: 'Nequi',
      bancolombia: 'Bancolombia',
      daviplata: 'Daviplata',
    };
    
    return methodNames[paymentMethod] || paymentMethod;
  }
}
