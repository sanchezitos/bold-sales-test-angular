import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formatDateLong, formatDateShort } from '../../../utils/formatters';

@Component({
  selector: 'app-date-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './date-label.component.html',
  styleUrls: ['./date-label.component.scss']
})
export class DateLabelComponent {
  @Input() date: Date | string | number = new Date();
  @Input() format: 'short' | 'long' = 'long';

  formattedDate(): string {
    // Si ya es un string (ej: "1 de octubre - 7 de octubre"), mostrarlo directamente
    if (typeof this.date === 'string') {
      return this.date;
    }
    
    return this.format === 'long'
      ? formatDateLong(this.date)
      : formatDateShort(this.date);
  }
}
