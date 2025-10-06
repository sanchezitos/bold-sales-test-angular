import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.scss']
})
export class FilterOptionComponent {
  @Input() label = '';
  @Input() checked = false;
  @Input() disabled = false;
  @Input() id?: string;

  @Output() change = new EventEmitter<boolean>();

  get checkboxId(): string {
    return this.id || `filter-option-${this.label.toLowerCase().replace(/\s+/g, '-')}`;
  }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.change.emit(target.checked);
  }
}
