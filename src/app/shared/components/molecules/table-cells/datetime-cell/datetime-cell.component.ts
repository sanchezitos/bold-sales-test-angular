import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datetime-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datetime-cell.component.html',
  styleUrls: ['./datetime-cell.component.scss']
})
export class DateTimeCellComponent {
  @Input() date: Date | string | number = new Date();
  @Input() format: 'full' | 'short' = 'full';

  formatDate(): string {
    const dateObj = new Date(this.date);
    
    if (this.format === 'short') {
      return new Intl.DateTimeFormat('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(dateObj);
    }
    
    return new Intl.DateTimeFormat('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(dateObj);
  }
}
