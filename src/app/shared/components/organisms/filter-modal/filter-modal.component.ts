import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from '../../atoms/dropdown/dropdown.component';
import { FilterSalesTypeSectionComponent, SalesType } from '../filter-modal-sections/filter-sales-type-section/filter-sales-type-section.component';
import { FilterPaymentMethodSectionComponent, PaymentMethod } from '../filter-modal-sections/filter-payment-method-section/filter-payment-method-section.component';
import { ButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-filter-modal',
  standalone: true,
  imports: [
    CommonModule, 
    DropdownComponent, 
    FilterSalesTypeSectionComponent, 
    FilterPaymentMethodSectionComponent,
    ButtonComponent
  ],
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.scss']
})
export class FilterModalComponent implements OnInit, OnChanges {
  @Input() set isOpen(value: boolean) {
    this.isOpenSignal.set(value);
  }
  @Input() currentSalesTypes: SalesType[] = [];
  @Input() currentPaymentMethods: PaymentMethod[] = [];

  @Output() close = new EventEmitter<void>();
  @Output() apply = new EventEmitter<{ salesTypes: SalesType[], paymentMethods: PaymentMethod[] }>();

  // Estado local temporal (solo para el dropdown)
  localSalesTypes: SalesType[] = [];
  localPaymentMethods: PaymentMethod[] = [];
  
  // Signal para el dropdown
  isOpenSignal = signal(false);

  ngOnInit(): void {
    this.syncLocalState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] && this.isOpenSignal()) {
      this.syncLocalState();
    }
  }

  private syncLocalState(): void {
    this.localSalesTypes = [...this.currentSalesTypes];
    this.localPaymentMethods = [...this.currentPaymentMethods];
  }

  onSalesTypesChange(salesTypes: SalesType[]): void {
    this.localSalesTypes = salesTypes;
  }

  onPaymentMethodsChange(paymentMethods: PaymentMethod[]): void {
    this.localPaymentMethods = paymentMethods;
  }

  handleApply(): void {
    this.apply.emit({
      salesTypes: this.localSalesTypes,
      paymentMethods: this.localPaymentMethods
    });
    this.onClose();
  }

  onClose(): void {
    this.close.emit();
  }
}
