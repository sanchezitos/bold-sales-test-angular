import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonComponent } from '../../atoms/skeleton/skeleton.component';
import { SkeletonTextComponent } from '../../atoms/skeleton-text/skeleton-text.component';
import { SkeletonCircleComponent } from '../../atoms/skeleton-circle/skeleton-circle.component';
import { SkeletonRectComponent } from '../../atoms/skeleton-rect/skeleton-rect.component';
import { SkeletonAnimation } from '../../atoms/skeleton/skeleton.component';

@Component({
  selector: 'app-skeleton-card',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonTextComponent,
    SkeletonCircleComponent,
    SkeletonRectComponent
  ],
  templateUrl: './skeleton-card.component.html',
  styleUrls: ['./skeleton-card.component.scss']
})
export class SkeletonCardComponent {
  @Input() compact = false;
  @Input() loading = true;
  @Input() animation: SkeletonAnimation = 'shimmer';
  @Input() duration = 1500;

  // Header options
  @Input() showHeader = true;
  @Input() showAvatar = false;
  @Input() avatarSize = '2.5rem';
  @Input() headerLines = 1;
  @Input() headerLastLineWidth = '60%';
  @Input() headerLineHeight = '1rem';
  @Input() showHeaderActions = false;

  // Title options
  @Input() showTitle = true;
  @Input() titleLines = 1;
  @Input() titleLastLineWidth = '80%';
  @Input() titleLineHeight = '1.25rem';

  // Content options
  @Input() contentLines = 3;
  @Input() contentLastLineWidth = '70%';
  @Input() contentLineHeight = '1rem';

  // Image options
  @Input() showImage = false;
  @Input() imageWidth = '100%';
  @Input() imageHeight = '200px';
  @Input() imageBorderRadius = '0.5rem';

  // Footer options
  @Input() showFooter = false;
  @Input() footerButtons = [1, 2]; // Number of buttons to show

  // Custom content
  @Input() customContent = false;

  // Preset configurations
  static createTransactionCardPreset(): Partial<SkeletonCardComponent> {
    return {
      showHeader: true,
      showAvatar: false,
      headerLines: 1,
      headerLastLineWidth: '40%',
      showTitle: false,
      contentLines: 4,
      contentLastLineWidth: '60%',
      showFooter: true,
      footerButtons: [1, 2]
    };
  }

  static createUserCardPreset(): Partial<SkeletonCardComponent> {
    return {
      showHeader: true,
      showAvatar: true,
      avatarSize: '3rem',
      headerLines: 2,
      headerLastLineWidth: '70%',
      showTitle: true,
      titleLines: 1,
      titleLastLineWidth: '90%',
      contentLines: 2,
      contentLastLineWidth: '80%',
      showFooter: false
    };
  }

  static createProductCardPreset(): Partial<SkeletonCardComponent> {
    return {
      showHeader: false,
      showTitle: true,
      titleLines: 1,
      titleLastLineWidth: '85%',
      showImage: true,
      imageHeight: '150px',
      contentLines: 2,
      contentLastLineWidth: '75%',
      showFooter: true,
      footerButtons: [1]
    };
  }
}
