import { Component, Input, Output, EventEmitter, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Input() pageSize = 10;
  @Input() totalItems = 0;
  @Input() canPreviousPage = false;
  @Input() canNextPage = false;
  @Input() showPageSizeSelector = true;
  @Input() showInfo = true;
  @Input() maxVisiblePages = 5;
  @Input() pageSizeOptions = [10, 20, 50, 100];

  @Output() onPageChange = new EventEmitter<number>();
  @Output() onPageSizeChange = new EventEmitter<number>();

  // Computed properties
  range = computed(() => {
    const start = this.totalItems === 0 ? 0 : (this.currentPage - 1) * this.pageSize + 1;
    const end = Math.min(this.currentPage * this.pageSize, this.totalItems);
    return { start, end, total: this.totalItems };
  });

  pageNumbers = computed(() => {
    const pages: (number | string)[] = [];

    if (this.totalPages <= this.maxVisiblePages) {
      // Mostrar todas las páginas
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar con elipsis
      if (this.currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1, '...', this.totalPages - 3, this.totalPages - 2, this.totalPages - 1, this.totalPages);
      } else {
        pages.push(1, '...', this.currentPage - 1, this.currentPage, this.currentPage + 1, '...', this.totalPages);
      }
    }

    return pages;
  });

  // Methods
  goToPreviousPage(): void {
    if (this.canPreviousPage) {
      this.onPageChange.emit(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.canNextPage) {
      this.onPageChange.emit(this.currentPage + 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.onPageChange.emit(page);
    }
  }
}