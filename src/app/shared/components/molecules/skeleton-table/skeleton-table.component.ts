import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SkeletonComponent } from '../../atoms/skeleton/skeleton.component';
import { SkeletonTextComponent } from '../../atoms/skeleton-text/skeleton-text.component';
import { SkeletonCircleComponent } from '../../atoms/skeleton-circle/skeleton-circle.component';
import { SkeletonRectComponent } from '../../atoms/skeleton-rect/skeleton-rect.component';
import { SkeletonAnimation } from '../../atoms/skeleton/skeleton.component';

@Component({
  selector: 'app-skeleton-table',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonTextComponent,
    SkeletonCircleComponent,
    SkeletonRectComponent
  ],
  templateUrl: './skeleton-table.component.html',
  styleUrls: ['./skeleton-table.component.scss']
})
export class SkeletonTableComponent {
  @Input() rows = 5;
  @Input() columns = 4;
  @Input() compact = false;
  @Input() loading = true;
  @Input() animation: SkeletonAnimation = 'shimmer';
  @Input() duration = 1500;

  // Table structure options
  @Input() showTitle = true;
  @Input() showHeader = true;
  @Input() showActions = false;
  @Input() showHeaderActions = false;
  @Input() showPagination = false;

  // Column configuration
  @Input() columnTypes: ('text' | 'number' | 'avatar' | 'image' | 'badge')[] = [];
  @Input() columnWidths: string[] = [];
  @Input() columnTextWidths: string[] = [];

  // Actions configuration
  @Input() actionCount = 2;

  // Pagination configuration
  @Input() paginationButtonCount = 5;

  // Computed properties
  get skeletonRows(): number[] {
    return Array(this.rows).fill(0).map((_, index) => index);
  }

  get skeletonColumns(): any[] {
    return Array(this.columns).fill(0).map((_, index) => ({
      width: this.columnWidths[index] || 'auto',
      textWidth: this.columnTextWidths[index] || '80%',
      type: this.columnTypes[index] || 'text',
      sortable: Math.random() > 0.5, // Random sortable columns
      lines: this.columnTypes[index] === 'text' ? (Math.random() > 0.7 ? 2 : 1) : 1,
      lineHeight: '1rem',
      size: '2rem',
      height: this.columnTypes[index] === 'image' ? '2rem' : '1.5rem',
      borderRadius: this.columnTypes[index] === 'badge' ? '0.75rem' : '0.25rem'
    }));
  }

  get skeletonActions(): any[] {
    return Array(this.actionCount).fill(0).map((_, index) => ({
      width: '2rem',
      height: '2rem',
      borderRadius: '0.375rem'
    }));
  }

  get skeletonPaginationButtons(): number[] {
    return Array(this.paginationButtonCount).fill(0).map((_, index) => index);
  }

  // Track by functions
  trackByIndex(index: number): number {
    return index;
  }

  // Preset configurations
  static createTransactionTablePreset(): Partial<SkeletonTableComponent> {
    return {
      rows: 8,
      columns: 6,
      showTitle: true,
      showHeader: true,
      showActions: true,
      showPagination: true,
      columnTypes: ['text', 'number', 'badge', 'text', 'text', 'text'],
      columnWidths: ['auto', '120px', '100px', '150px', '120px', 'auto'],
      columnTextWidths: ['60%', '70%', '80%', '85%', '75%', '90%'],
      actionCount: 2,
      paginationButtonCount: 5
    };
  }

  static createUserTablePreset(): Partial<SkeletonTableComponent> {
    return {
      rows: 6,
      columns: 5,
      showTitle: true,
      showHeader: true,
      showActions: true,
      showPagination: true,
      columnTypes: ['avatar', 'text', 'text', 'badge', 'text'],
      columnWidths: ['60px', 'auto', 'auto', '100px', 'auto'],
      columnTextWidths: ['100%', '80%', '75%', '70%', '85%'],
      actionCount: 3,
      paginationButtonCount: 4
    };
  }

  static createProductTablePreset(): Partial<SkeletonTableComponent> {
    return {
      rows: 7,
      columns: 5,
      showTitle: true,
      showHeader: true,
      showActions: true,
      showPagination: true,
      columnTypes: ['image', 'text', 'number', 'badge', 'text'],
      columnWidths: ['80px', 'auto', '100px', '80px', 'auto'],
      columnTextWidths: ['100%', '90%', '60%', '70%', '80%'],
      actionCount: 2,
      paginationButtonCount: 6
    };
  }
}
