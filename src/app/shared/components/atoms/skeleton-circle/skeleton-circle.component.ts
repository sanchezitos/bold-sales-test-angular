import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { SkeletonAnimation } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-skeleton-circle',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './skeleton-circle.component.html',
  styleUrls: ['./skeleton-circle.component.scss']
})
export class SkeletonCircleComponent {
  @Input() size: string | number = '2rem';
  @Input() animation: SkeletonAnimation = 'shimmer';
  @Input() duration: number = 1500;
  @Input() ariaLabel = 'Cargando elemento circular';
  @Input() showAria = true;
}
