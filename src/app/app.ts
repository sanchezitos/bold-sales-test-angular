import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ThemeService } from './core/services/theme.service';
import { HeaderComponent } from './shared/components/organisms/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, HttpClientModule, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('Bold Sales Dashboard');

  // Navigation items for header
  protected readonly navigationItems = [
    { label: 'Dashboard', href: '/', active: true },
    { label: 'Transacciones', href: '/transactions', active: false },
    { label: 'Reportes', href: '/reports', active: false }
  ];

  constructor(
    private themeService: ThemeService
  ) {}

  // Computed signals for reactive UI
  protected readonly isDarkTheme = computed(() => this.themeService.isDarkTheme());

  ngOnInit(): void {
    // Initialize services
    this.themeService.setTheme('system');
  }
}
