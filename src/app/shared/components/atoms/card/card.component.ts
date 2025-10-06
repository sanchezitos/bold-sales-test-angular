import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type CardVariant = 'default' | 'elevated' | 'outlined' | 'filled';
export type CardSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() title?: string;
  @Input() variant: CardVariant = 'default';
  @Input() size: CardSize = 'md';
  @Input() header?: boolean;
  @Input() footer?: boolean;
  @Input() headerActions?: boolean;
  @Input() clickable = false;
  @Input() ariaLabel?: string;

  @ContentChild('header') headerTemplate: TemplateRef<any> | undefined;
  @ContentChild('footer') footerTemplate: TemplateRef<any> | undefined;

  get showHeader(): boolean {
    return this.header || !!this.title;
  }

  get showFooter(): boolean {
    return !!this.footerTemplate;
  }

  get cardClasses(): string {
    const classes = [
      'card',
      `card--${this.variant}`,
      `card--${this.size}`
    ];

    if (this.clickable) {
      classes.push('card--clickable');
    }

    return classes.join(' ');
  }
}
