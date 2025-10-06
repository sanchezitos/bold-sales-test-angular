import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ColumnDef<T> {
  key: string;
  label: string;
  render: (row: T, index: number) => string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  headerClassName?: string;
  cellClassName?: string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent<T = any> {
  @Input() columns: ColumnDef<T>[] = [];
  @Input() data: T[] = [];
  @Input() getRowKey: (row: T, index: number) => string | number = (row, index) => index;
  @Input() emptyMessage = 'No hay datos para mostrar';
  @Input() rowClassName?: string;
  @Input() showRowBorder: boolean | ((row: T, index: number) => boolean) = false;
  @Input() rowBorderColor = 'var(--bold-blue)';

  @Output() rowClick = new EventEmitter<{ row: T; index: number }>();

  trackByFn = (index: number, item: T) => this.getRowKey(item, index);

  getHeaderClasses(column: ColumnDef<T>): string {
    const classes = [
      'data-table-header-cell',
      'px-6 py-2',
      'text-sm font-medium',
      'text-left'
    ];

    if (column.align === 'center') classes.push('text-center');
    if (column.align === 'right') classes.push('text-right');
    if (column.headerClassName) classes.push(column.headerClassName);

    return classes.join(' ');
  }

  getRowClasses(row: T, index: number): string {
    const classes = [
      'data-table-row',
      'transition-colors'
    ];

    if (this.rowClick.observed) classes.push('cursor-pointer');
    if (this.rowClassName) classes.push(this.rowClassName);

    return classes.join(' ');
  }

  getCellClasses(column: ColumnDef<T>, colIndex: number, row: T, index: number): string {
    const classes = [
      'py-4',
      'text-sm'
    ];

    // Padding adjustment for first column with border (igual que React)
    const shouldShowBorder = this.getShouldShowBorder(row, index);
    if (colIndex === 0 && shouldShowBorder) {
      classes.push('pl-5');
    } else {
      classes.push('px-6');
    }

    if (column.align === 'center') classes.push('text-center');
    if (column.align === 'right') classes.push('text-right');
    if (column.cellClassName) classes.push(column.cellClassName);

    return classes.join(' ');
  }

  getRowBorder(row: T, index: number): string {
    const shouldShowBorder = this.getShouldShowBorder(row, index);
    return shouldShowBorder ? `4px solid ${this.rowBorderColor}` : 'none';
  }

  private getShouldShowBorder(row: T, index: number): boolean {
    if (typeof this.showRowBorder === 'function') {
      return this.showRowBorder(row, index);
    }
    return this.showRowBorder;
  }

  onRowClick(row: T, index: number): void {
    this.rowClick.emit({ row, index });
  }
}