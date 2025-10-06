import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from '../../atoms/tab/tab.component';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [CommonModule, TabComponent],
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTab = '';

  @Output() tabChange = new EventEmitter<string>();

  onTabClick(tabId: string): void {
    const tab = this.tabs.find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.tabChange.emit(tabId);
    }
  }

  getTabLabel(tab: TabItem): string {
    // Por ahora retornamos el label directamente
    // En el futuro se puede agregar traducción aquí
    return tab.label;
  }

  getTabGroupStyles(): any {
    return {
      'gap': '2px'
    };
  }
}
