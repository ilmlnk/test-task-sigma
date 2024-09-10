import { Directive, ElementRef, HostListener, Input, Renderer2, AfterViewInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appEllipsis]',
  standalone: true
})
export class EllipsisDirective implements AfterViewInit, OnDestroy {
  @Input() lines: number = 2;
  private resizeObserver: ResizeObserver;

  constructor(private el: ElementRef, private renderer: Renderer2) { }


  @HostListener('window:resize') 
  onResize() {
    this.applyEllipsis();
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  ngAfterViewInit() {
    this.applyEllipsis();
    this.setupResizeObserver();
  }

  private applyEllipsis() {
    const element = this.el.nativeElement;
    if (typeof window !== 'undefined' && typeof getComputedStyle === 'function') {
      const style = getComputedStyle(element);
      const lineHeight = parseInt(style.lineHeight, 10);
      const maxHeight = lineHeight * this.lines;

      if (element.scrollHeight > maxHeight) {
        let text = element.innerText;
        while (element.scrollHeight > maxHeight && text.length > 0) {
          text = text.slice(0, -1);
          element.innerText = text + '...';
        }
      }
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.applyEllipsis());
      this.resizeObserver.observe(this.el.nativeElement);
    }
  }
}
