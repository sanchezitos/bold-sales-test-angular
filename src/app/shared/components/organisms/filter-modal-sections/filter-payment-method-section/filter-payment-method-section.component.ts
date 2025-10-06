import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterOptionComponent } from '../../../molecules/filter-option/filter-option.component';

export type PaymentMethod = 'card' | 'pse' | 'nequi' | 'bancolombia' | 'daviplata';

@Component({
  selector: 'app-filter-payment-method-section',
  standalone: true,
  imports: [CommonModule, FilterOptionComponent],
  templateUrl: './filter-payment-method-section.component.html',
  styleUrls: ['./filter-payment-method-section.component.scss']
})
export class FilterPaymentMethodSectionComponent {
  @Input() selectedPaymentMethods: PaymentMethod[] = [];
  @Output() selectionChange = new EventEmitter<PaymentMethod[]>();

  paymentMethodOptions = [
    { value: 'card' as PaymentMethod, label: 'Tarjeta' },
    { value: 'pse' as PaymentMethod, label: 'PSE' },
    { value: 'nequi' as PaymentMethod, label: 'Nequi' },
    { value: 'bancolombia' as PaymentMethod, label: 'Bancolombia' },
    { value: 'daviplata' as PaymentMethod, label: 'DaviPlata' }
  ];

  handleToggle(method: PaymentMethod, checked: boolean): void {
    if (checked) {
      // Agregar método de pago
      this.selectionChange.emit([...this.selectedPaymentMethods, method]);
    } else {
      // Quitar método de pago
      this.selectionChange.emit(this.selectedPaymentMethods.filter(m => m !== method));
    }
  }
}
