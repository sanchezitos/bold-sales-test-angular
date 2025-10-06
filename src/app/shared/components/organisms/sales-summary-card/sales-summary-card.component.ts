import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmountDisplayComponent } from '../../molecules/amount-display/amount-display.component';
import { GradientHeaderComponent } from '../../molecules/gradient-header/gradient-header.component';
import { DateLabelComponent } from '../../molecules/date-label/date-label.component';

@Component({
  selector: 'app-sales-summary-card',
  standalone: true,
  imports: [CommonModule, AmountDisplayComponent, GradientHeaderComponent, DateLabelComponent],
  templateUrl: './sales-summary-card.component.html',
  styleUrls: ['./sales-summary-card.component.scss']
})
export class SalesSummaryCardComponent {
  @Input() title = 'Total de ventas';
  @Input() amount = 0;
  @Input() date: Date | string | number = new Date();
  @Input() showInfo = true;
  @Input() infoTooltip?: string;

  @Output() infoClick = new EventEmitter<void>();

  onInfoClick(): void {
    this.infoClick.emit();
  }
}