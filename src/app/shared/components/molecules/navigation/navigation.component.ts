import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface NavigationItem {
  label: string;
  href: string;
  active?: boolean;
}

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  @Input() items: NavigationItem[] = [];

  getLinkClasses(item: NavigationItem): string {
    const baseClasses = ['navigation-link'];
    if (item.active) {
      baseClasses.push('navigation-link--active');
    }
    return baseClasses.join(' ');
  }
}
