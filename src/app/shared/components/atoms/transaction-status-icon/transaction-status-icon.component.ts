import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TransactionStatusIconType = 'terminal' | 'link';

@Component({
  selector: 'app-transaction-status-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-status-icon.component.html',
  styleUrls: ['./transaction-status-icon.component.scss']
})
export class TransactionStatusIconComponent {
  @Input() type: TransactionStatusIconType = 'terminal';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() className: string = '';

  get iconSize(): number {
    const sizes = {
      sm: 16,
      md: 20,
      lg: 24
    };
    return sizes[this.size];
  }

  get iconClass(): string {
    return `transaction-status-icon transaction-status-icon--${this.type} transaction-status-icon--${this.size} ${this.className}`.trim();
  }
}
