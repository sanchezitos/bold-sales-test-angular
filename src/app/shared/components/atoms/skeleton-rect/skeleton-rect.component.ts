import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { SkeletonAnimation } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-skeleton-rect',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './skeleton-rect.component.html',
  styleUrls: ['./skeleton-rect.component.scss']
})
export class SkeletonRectComponent {
  @Input() width: string | number = '100%';
  @Input() height: string | number = '1rem';
  @Input() borderRadius: string = '0.25rem';
  @Input() animation: SkeletonAnimation = 'shimmer';
  @Input() duration: number = 1500;
  @Input() ariaLabel = 'Cargando elemento rectangular';
  @Input() showAria = true;
}
