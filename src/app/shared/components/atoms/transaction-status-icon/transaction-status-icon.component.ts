import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type TransactionStatusIconType = 'terminal' | 'link';

@Component({
  selector: 'app-transaction-status-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      [attr.width]="iconSize" 
      [attr.height]="iconSize" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      [class]="iconClass">
      <ng-container [ngSwitch]="type">
        <!-- Terminal icon -->
        <g *ngSwitchCase="'terminal'">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </g>
        
        <!-- Link icon -->
        <g *ngSwitchCase="'link'">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </g>
        
        <!-- Default icon (terminal) -->
        <g *ngSwitchDefault>
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </g>
      </ng-container>
    </svg>
  `,
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
