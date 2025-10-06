import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { SkeletonAnimation } from '../skeleton/skeleton.component';

@Component({
  selector: 'app-skeleton-text',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './skeleton-text.component.html',
  styleUrls: ['./skeleton-text.component.scss']
})
export class SkeletonTextComponent {
  @Input() lines: number = 1;
  @Input() lastLineWidth: string = '75%';
  @Input() lineHeight: string = '1rem';
  @Input() spacing: string = '0.5rem';
  @Input() animation: SkeletonAnimation = 'shimmer';
  @Input() duration: number = 1500;
  @Input() loading = true;

  get skeletonLines(): number[] {
    return Array(this.lines).fill(0).map((_, index) => index);
  }

  trackByIndex(index: number): number {
    return index;
  }

  getLineWidth(lineIndex: number): string {
    // Last line has different width
    if (lineIndex === this.lines - 1) {
      return this.lastLineWidth;
    }
    return '100%';
  }
}
