import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type BadgeVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'status-success' | 'status-pending' | 'status-failed' | 'payment-card' | 'payment-nequi' | 'payment-pse';
export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeShape = 'rounded' | 'pill' | 'square';

@Component({
  selector: 'app-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {
  @Input() variant: BadgeVariant = 'default';
  @Input() size: BadgeSize = 'md';
  @Input() shape: BadgeShape = 'rounded';
  @Input() count?: number;
  @Input() maxCount = 99;
  @Input() tooltip?: string;
  @Input() ariaLabel?: string;
  @Input() dot = false;

  get badgeClasses(): string {
    const classes = [
      'badge',
      `badge--${this.variant}`,
      `badge--${this.size}`,
      `badge--${this.shape}`
    ];

    if (this.dot) {
      classes.push('badge--dot');
    }

    if (this.count !== undefined) {
      classes.push('badge--with-count');
    }

    return classes.join(' ');
  }

  formatCount(count: number): string {
    if (count > this.maxCount) {
      return `${this.maxCount}+`;
    }
    return count.toString();
  }
}
