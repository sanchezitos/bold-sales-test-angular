import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type SkeletonAnimation = 'shimmer' | 'pulse' | 'none';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {
  @Input() width: string | number = '100%';
  @Input() height: string | number = '1rem';
  @Input() borderRadius: string = '0.25rem';
  @Input() animation: SkeletonAnimation = 'shimmer';
  @Input() duration: number = 1500;
  @Input() ariaLabel = 'Cargando contenido';
  @Input() showAria = true;

  get skeletonClasses(): string {
    const classes = ['skeleton'];

    if (this.animation !== 'none') {
      classes.push(`skeleton--${this.animation}`);
    }

    return classes.join(' ');
  }

  get skeletonStyles(): string {
    const styles = [
      `width: ${typeof this.width === 'number' ? this.width + 'px' : this.width}`,
      `height: ${typeof this.height === 'number' ? this.height + 'px' : this.height}`,
      `border-radius: ${this.borderRadius}`,
      `--skeleton-duration: ${this.duration}ms`
    ];

    return styles.join('; ');
  }
}
