import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { NavigationComponent, NavigationItem } from '../../molecules/navigation/navigation.component';
import { ThemeToggleComponent } from '../../atoms/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LogoComponent, NavigationComponent, ThemeToggleComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() navigationItems: NavigationItem[] = [];
  @Input() showThemeToggle = true;
}
