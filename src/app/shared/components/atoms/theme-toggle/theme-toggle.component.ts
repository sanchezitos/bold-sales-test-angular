import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  @Input() className = '';

  @Output() themeChange = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
    this.themeChange.emit(this.themeService.getTheme());
  }

  getButtonClasses(): string {
    const baseClasses = ['theme-toggle-button'];
    if (this.className) {
      baseClasses.push(this.className);
    }
    return baseClasses.join(' ');
  }

  getThemeIcon(): string {
    return this.themeService.isDarkTheme() ? '🌙' : '☀️';
  }
}
