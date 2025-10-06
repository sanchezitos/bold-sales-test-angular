import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('system');
  private currentTheme: 'light' | 'dark' = 'light';

  public theme$: Observable<Theme> = this.themeSubject.asObservable();

  constructor() {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('bold-dashboard-theme') as Theme;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme('system');
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.themeSubject.value === 'system') {
          this.updateSystemTheme();
        }
      });
    }
  }

  /**
   * Get current theme setting
   */
  getTheme(): Theme {
    return this.themeSubject.value;
  }

  /**
   * Set theme and persist to localStorage
   */
  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem('bold-dashboard-theme', theme);
    
    if (theme === 'system') {
      this.updateSystemTheme();
    } else {
      this.applyTheme(theme);
    }
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    if (currentTheme === 'light') {
      this.setTheme('dark');
    } else if (currentTheme === 'dark') {
      this.setTheme('light');
    } else {
      // If system theme, toggle to opposite of current system preference
      const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.setTheme(systemPrefersDark ? 'light' : 'dark');
    }
  }

  /**
   * Get current effective theme (light or dark)
   */
  getEffectiveTheme(): 'light' | 'dark' {
    return this.currentTheme;
  }

  /**
   * Check if current theme is dark
   */
  isDarkTheme(): boolean {
    return this.currentTheme === 'dark';
  }

  /**
   * Update theme based on system preference
   */
  private updateSystemTheme(): void {
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.applyTheme(systemPrefersDark ? 'dark' : 'light');
  }

  /**
   * Apply theme to document
   */
  private applyTheme(theme: 'light' | 'dark'): void {
    this.currentTheme = theme;
    
    // Remove existing theme classes
    document.documentElement.classList.remove('light', 'dark');
    document.body.classList.remove('light', 'dark');
    
    // Add new theme class
    document.documentElement.classList.add(theme);
    document.body.classList.add(theme);
    
    // Update data attribute for CSS selectors
    document.documentElement.setAttribute('data-theme', theme);
  }
}
