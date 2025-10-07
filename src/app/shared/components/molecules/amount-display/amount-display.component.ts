import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatCurrency } from '../../../utils/formatters';

export type AmountSize = 'md' | 'lg' | 'xl';
export type CurrencyCode = 'COP' | 'USD' | 'EUR' | 'MXN' | 'CLP';

@Component({
  selector: 'app-amount-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amount-display.component.html',
  styleUrls: ['./amount-display.component.scss']
})
export class AmountDisplayComponent {
  @Input() amount: number = 0;
  @Input() currency: CurrencyCode = 'COP';
  @Input() size: AmountSize = 'xl';
  @Input() loading = false;

  // Getter for formatted amount
  get formattedAmount(): string {
    if (this.loading) return '';
    return formatCurrency(this.amount, this.currency);
  }

  // Static methods for common configurations
  static createSalesAmount(amount: number): Partial<AmountDisplayComponent> {
    return {
      amount,
      currency: 'COP',
      size: 'lg'
    };
  }

  static createDeductionAmount(amount: number): Partial<AmountDisplayComponent> {
    return {
      amount,
      currency: 'COP',
      size: 'md'
    };
  }

  static createSmallAmount(amount: number): Partial<AmountDisplayComponent> {
    return {
      amount,
      currency: 'COP',
      size: 'md'
    };
  }

  static createLargeAmount(amount: number): Partial<AmountDisplayComponent> {
    return {
      amount,
      currency: 'COP',
      size: 'xl'
    };
  }
}
