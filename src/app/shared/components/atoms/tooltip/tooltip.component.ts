import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild, Renderer2, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
export type TooltipTrigger = 'hover' | 'click';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit, OnDestroy {
  @Input() content: string = '';
  @Input() position: TooltipPosition = 'bottom';
  @Input() trigger: TooltipTrigger = 'click';
  @Input() className: string = '';

  @ViewChild('triggerElement', { static: true }) triggerElement!: ElementRef;
  @ViewChild('tooltipElement', { static: false }) tooltipElement!: ElementRef;

  isVisible = false;
  coords = { top: 0, left: 0 };

  private listeners: (() => void)[] = [];

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.setupEventListeners();
  }

  ngOnDestroy(): void {
    this.cleanupEventListeners();
    this.hideTooltip();
  }

  private setupEventListeners(): void {
    const trigger = this.triggerElement.nativeElement;

    if (this.trigger === 'hover') {
      const mouseEnterListener = this.renderer.listen(trigger, 'mouseenter', () => {
        this.showTooltip();
      });
      const mouseLeaveListener = this.renderer.listen(trigger, 'mouseleave', () => {
        this.hideTooltip();
      });
      this.listeners.push(mouseEnterListener, mouseLeaveListener);
    } else {
      const clickListener = this.renderer.listen(trigger, 'click', () => {
        this.toggleTooltip();
      });
      this.listeners.push(clickListener);
    }
  }

  private cleanupEventListeners(): void {
    this.listeners.forEach(cleanup => cleanup());
    this.listeners = [];
  }

  showTooltip(): void {
    this.isVisible = true;
    this.updatePosition();
    this.setupGlobalListeners();
  }

  hideTooltip(): void {
    this.isVisible = false;
    this.cleanupGlobalListeners();
  }

  toggleTooltip(): void {
    if (this.isVisible) {
      this.hideTooltip();
    } else {
      this.showTooltip();
    }
  }

  private updatePosition(): void {
    if (!this.triggerElement?.nativeElement) return;

    setTimeout(() => {
      if (!this.tooltipElement?.nativeElement) return;

      const triggerRect = this.triggerElement.nativeElement.getBoundingClientRect();
      const tooltipRect = this.tooltipElement.nativeElement.getBoundingClientRect();
      
      let top = 0;
      let left = triggerRect.left + triggerRect.width / 2;

      switch (this.position) {
        case 'bottom':
          top = triggerRect.bottom + 8;
          left = left - tooltipRect.width / 2;
          break;
        case 'top':
          top = triggerRect.top - tooltipRect.height - 8;
          left = left - tooltipRect.width / 2;
          break;
        case 'left':
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.left - tooltipRect.width - 8;
          top = top - tooltipRect.height / 2;
          break;
        case 'right':
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.right + 8;
          top = top - tooltipRect.height / 2;
          break;
      }

      this.coords = { top, left };
    });
  }

  private setupGlobalListeners(): void {
    if (this.trigger === 'click') {
      const clickOutsideListener = this.renderer.listen(this.document, 'mousedown', (event) => {
        this.handleClickOutside(event);
      });
      const escapeListener = this.renderer.listen(this.document, 'keydown', (event) => {
        this.handleEscape(event);
      });
      const scrollListener = this.renderer.listen(this.document, 'scroll', () => {
        this.updatePosition();
      });
      const resizeListener = this.renderer.listen(window, 'resize', () => {
        this.updatePosition();
      });

      this.listeners.push(clickOutsideListener, escapeListener, scrollListener, resizeListener);
    }
  }

  private cleanupGlobalListeners(): void {
    // Los listeners globales se limpian automáticamente cuando se destruye el componente
  }

  private handleClickOutside(event: Event): void {
    const target = event.target as Node;
    const trigger = this.triggerElement?.nativeElement;
    const tooltip = this.tooltipElement?.nativeElement;

    if (trigger && !trigger.contains(target) && tooltip && !tooltip.contains(target)) {
      this.hideTooltip();
    }
  }

  private handleEscape(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      this.hideTooltip();
    }
  }

  getArrowStyle(): any {
    const arrowSize = 8;
    const bgColor = 'var(--background)';

    switch (this.position) {
      case 'bottom':
        return {
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid ${bgColor}`,
          filter: 'drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.05))',
        };
      case 'top':
        return {
          bottom: '-8px',
          left: '50%',
          transform: 'translateX(-50%)',
          borderLeft: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid transparent`,
          borderTop: `${arrowSize}px solid ${bgColor}`,
          filter: 'drop-shadow(0 1px 1px rgba(0, 0, 0, 0.05))',
        };
      case 'left':
        return {
          right: '-8px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderLeft: `${arrowSize}px solid ${bgColor}`,
          filter: 'drop-shadow(1px 0 1px rgba(0, 0, 0, 0.05))',
        };
      case 'right':
        return {
          left: '-8px',
          top: '50%',
          transform: 'translateY(-50%)',
          borderTop: `${arrowSize}px solid transparent`,
          borderBottom: `${arrowSize}px solid transparent`,
          borderRight: `${arrowSize}px solid ${bgColor}`,
          filter: 'drop-shadow(-1px 0 1px rgba(0, 0, 0, 0.05))',
        };
    }
  }
}
