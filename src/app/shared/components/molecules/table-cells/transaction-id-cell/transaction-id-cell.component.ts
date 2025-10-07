import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../atoms/icon/icon.component';

@Component({
  selector: 'app-transaction-id-cell',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './transaction-id-cell.component.html',
  styleUrls: ['./transaction-id-cell.component.scss']
})
export class TransactionIdCellComponent {
  @Input() id = '';
  @Input() copiable = false;

  copied = false;
  private copyTimeout?: number;

  async handleCopy(): Promise<void> {
    if (!this.id) return;
    
    try {
      await navigator.clipboard.writeText(this.id);
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
