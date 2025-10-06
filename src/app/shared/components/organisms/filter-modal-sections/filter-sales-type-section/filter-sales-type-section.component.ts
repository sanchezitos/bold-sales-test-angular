import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterOptionComponent } from '../../../molecules/filter-option/filter-option.component';

export type SalesType = 'terminal' | 'payment_link';

@Component({
  selector: 'app-filter-sales-type-section',
  standalone: true,
  imports: [CommonModule, FilterOptionComponent],
  templateUrl: './filter-sales-type-section.component.html',
  styleUrls: ['./filter-sales-type-section.component.scss']
})
export class FilterSalesTypeSectionComponent {
  @Input() selectedSalesTypes: SalesType[] = [];
  @Output() selectionChange = new EventEmitter<SalesType[]>();

  salesTypeOptions = [
    { value: 'terminal' as SalesType, label: 'Terminal' },
    { value: 'payment_link' as SalesType, label: 'Link de pago' }
  ];

  get isViewAllActive(): boolean {
    return this.selectedSalesTypes.length === 0;
  }

  handleToggle(salesType: SalesType, checked: boolean): void {
    if (checked) {
      // Agregar tipo de venta
      this.selectionChange.emit([...this.selectedSalesTypes, salesType]);
    } else {
      // Quitar tipo de venta
      this.selectionChange.emit(this.selectedSalesTypes.filter(t => t !== salesType));
    }
  }

  handleViewAll(): void {
    this.selectionChange.emit([]); // Vacío = "Ver todos"
  }
}
