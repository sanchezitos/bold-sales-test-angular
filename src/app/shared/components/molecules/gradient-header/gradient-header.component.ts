import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gradient-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gradient-header.component.html',
  styleUrls: ['./gradient-header.component.scss']
})
export class GradientHeaderComponent {
  @Input() title: string = '';
  @Input() showInfo: boolean = true;
  @Input() infoTooltip: string = 'Más información';

  @Output() infoClick = new EventEmitter<void>();

  onInfoClick(): void {
    this.infoClick.emit();
  }
}
