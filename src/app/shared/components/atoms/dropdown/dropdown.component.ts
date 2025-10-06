import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, signal, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type DropdownWidth = 'sm' | 'md' | 'lg' | 'auto';
export type DropdownPosition = 'bottom-left' | 'bottom-right' | 'bottom-center';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() isOpen = signal(false);
  @Input() title?: string;
  @Input() showCloseButton = true;
  @Input() width: DropdownWidth = 'md';
  @Input() closeOnClickOutside = true;
  @Input() position: DropdownPosition = 'bottom-right';

  @Output() onClose = new EventEmitter<void>();

  // Internal state
  isMobile = signal(false);

  constructor(private elementRef: ElementRef) {
    this.checkMobile();
  }

  ngOnInit(): void {
    // Listen for window resize
    window.addEventListener('resize', () => this.checkMobile());
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', () => this.checkMobile());
  }

  private checkMobile(): void {
    this.isMobile.set(window.innerWidth < 768);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.closeOnClickOutside && this.isOpen()) {
      const target = event.target as HTMLElement;
      const dropdownElement = this.elementRef.nativeElement.querySelector('.dropdown-container');
      
      if (dropdownElement && !dropdownElement.contains(target)) {
        this.onClose.emit();
      }
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscapeKey(event: Event): void {
    if (this.isOpen()) {
      event.preventDefault();
      this.onClose.emit();
    }
  }

  get showHeader(): boolean {
    return !!this.title || this.showCloseButton;
  }
}
