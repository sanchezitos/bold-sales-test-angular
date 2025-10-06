import { Component, Input, Output, EventEmitter, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {
  @Input() placeholder = 'Buscar';
  @Input() value = '';
  @Input() disabled = false;

  @Output() valueChange = new EventEmitter<string>();
  @Output() search = new EventEmitter<string>();

  // Computed property
  hasText = signal(false);

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    
    this.value = newValue;
    this.hasText.set(newValue.length > 0);
    
    this.valueChange.emit(newValue);
    this.search.emit(newValue);
  }

  handleClear(): void {
    this.value = '';
    this.hasText.set(false);
    
    this.valueChange.emit('');
    this.search.emit('');
  }
}
