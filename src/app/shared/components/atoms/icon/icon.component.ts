import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      [attr.width]="size" 
      [attr.height]="size" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      stroke-width="2" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      [class]="iconClass">
      <ng-container [ngSwitch]="name">
        <!-- Close icon -->
        <g *ngSwitchCase="'close'">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </g>
        
        <!-- Check circle icon -->
        <g *ngSwitchCase="'check-circle'">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22,4 12,14.01 9,11.01"></polyline>
        </g>
        
        <!-- Clock icon -->
        <g *ngSwitchCase="'clock'">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12,6 12,12 16,14"></polyline>
        </g>
        
        <!-- X circle icon -->
        <g *ngSwitchCase="'x-circle'">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="15" y1="9" x2="9" y2="15"></line>
          <line x1="9" y1="9" x2="15" y2="15"></line>
        </g>
        
        <!-- Copy icon -->
        <g *ngSwitchCase="'copy'">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </g>
        
        <!-- Check icon -->
        <g *ngSwitchCase="'check'">
          <polyline points="20,6 9,17 4,12"></polyline>
        </g>
        
        <!-- Alert circle icon -->
        <g *ngSwitchCase="'alert-circle'">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </g>
        
        <!-- Default icon (alert circle) -->
        <g *ngSwitchDefault>
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </g>
      </ng-container>
    </svg>
  `,
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() name: string = 'alert-circle';
  @Input() size: number | string = 24;
  @Input() className: string = '';

  get iconClass(): string {
    return `icon icon--${this.name} ${this.className}`.trim();
  }
}
