import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() label = '';
  @Input() active = false;
  @Input() disabled = false;

  getTabClasses(): string {
    const baseClasses = [
      'tab-button',
      'text-sm sm:text-base',
      'font-normal',
      'text-center',
      'transition-all',
      'duration-200',
      'focus:outline-none',
      'whitespace-nowrap',
      'border-none',
      'outline-none',
      'theme-transition',
      'min-w-0'
    ];

    if (this.disabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    } else {
      baseClasses.push('cursor-pointer');
      if (!this.active) {
        baseClasses.push('hover:opacity-80');
      }
    }

    return baseClasses.join(' ');
  }

  getTabStyles(): any {
    return {
      'background-color': this.active ? 'var(--bold-gray-light)' : 'transparent',
      'color': this.active ? 'var(--bold-blue)' : 'var(--foreground-muted)',
      'font-family': 'var(--font-montserrat), -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'padding': '0.25rem 1rem', // py-1 px-4 equivalente
      'border-radius': '1.5rem' // rounded-3xl equivalente
    };
  }
}
