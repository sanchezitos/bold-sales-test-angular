import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() name: string = 'alert-circle';
  @Input() size: number | string = 24;
  @Input() className: string = '';

  get iconClass(): string {
    const sizeClass = typeof this.size === 'string' ? `icon--${this.size}` : '';
    return `icon icon--${this.name} ${sizeClass} ${this.className}`.trim();
  }

  get isSpecialIcon(): boolean {
    const specialIcons = ['success-trx', 'decline-trx'];
    return specialIcons.includes(this.name);
  }

  get iconSize(): number {
    if (typeof this.size === 'string') {
      switch (this.size) {
        case 'sm': return 16;
        case 'md': return 20;
        case 'lg': return 24;
        case 'xl': return 32;
        default: return 24;
      }
    }
    return this.size;
  }
}
