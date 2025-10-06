import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterModalComponent } from '../../organisms/filter-modal/filter-modal.component';

@Component({
  selector: 'app-filter-button',
  standalone: true,
  imports: [CommonModule, FilterModalComponent],
  templateUrl: './filter-button.component.html',
  styleUrls: ['./filter-button.component.scss']
})
export class FilterButtonComponent {
  @Input() count?: number;
  @Input() disabled = false;
  @Input() currentSalesTypes: any[] = [];
  @Input() currentPaymentMethods: any[] = [];

  @Output() onClick = new EventEmitter<Event>();
  @Output() applyFilters = new EventEmitter<{ salesTypes: string[], paymentMethods: string[] }>();

  isModalOpen = false;

  onButtonClick(): void {
    this.isModalOpen = true;
    this.onClick.emit();
  }

  onModalClose(): void {
    this.isModalOpen = false;
  }

  onFiltersApply(filters: { salesTypes: string[], paymentMethods: string[] }): void {
    this.applyFilters.emit(filters);
  }
}