import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amount-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './amount-cell.component.html',
  styleUrls: ['./amount-cell.component.scss']
})
export class AmountCellComponent {
  @Input() amount = 0;
  @Input() currency = 'COP';
  @Input() deduction?: number;
  @Input() deductionLabel = 'Deducción';
  @Input() align: 'left' | 'right' = 'right';

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  }

  get containerClass(): string {
    return `amount-cell amount-cell--${this.align}`;
  }
}
