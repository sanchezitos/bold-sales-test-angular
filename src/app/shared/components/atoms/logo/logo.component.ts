import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type LogoVariant = 'gradient' | 'white' | 'blue' | 'red';
export type LogoSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  @Input() href?: string;
  @Input() size: LogoSize = 'md';
  @Input() variant: LogoVariant = 'white';

  getIconSize(): number {
    const sizes = {
      sm: 20,
      md: 28,
      lg: 36
    };
    return sizes[this.size];
  }

  getIconWidth(): number {
    // Mantener proporción original 79:28
    return (this.getIconSize() * 79) / 28;
  }

  getLogoClasses(): string {
    return 'logo-container';
  }

  getLogoColor(): string {
    const colors = {
      gradient: 'url(#bold-icon-gradient)',
      white: '#FFFFFF',
      blue: '#121E6C',
      red: '#EE424E'
    };
    return colors[this.variant];
  }
}
