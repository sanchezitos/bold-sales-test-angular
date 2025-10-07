import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStatusIconComponent } from '../../../atoms/transaction-status-icon/transaction-status-icon.component';

@Component({
  selector: 'app-transaction-status-cell',
  standalone: true,
  imports: [CommonModule, TransactionStatusIconComponent],
  templateUrl: './transaction-status-cell.component.html',
  styleUrls: ['./transaction-status-cell.component.scss']
})
export class TransactionStatusCellComponent {
  @Input() type: 'link' | 'terminal' = 'terminal';
  @Input() status = '';
}
