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

      element.style.wordBreak = 'break-word';
      element.style.overflowWrap = 'break-word';

      const lineHeight = parseInt(style.lineHeight, 10);
      const maxHeight = lineHeight * this.lines;

      const originalText = element.innerText;

      element.style.maxHeight = `${maxHeight}px`;
      element.style.overflow = 'hidden';

      if (element.scrollHeight > maxHeight) {
        const truncatedText = this.truncateText(originalText, maxHeight, element);
        element.innerText = truncatedText;
      }
    }
  }

  private truncateText(text: string, maxHeight: number, element: HTMLElement): string {
    let low = 0;
    let high = text.length;
    let middle;

    while (low < high) {
      middle = Math.floor((low + high) / 2);
      element.innerText = text.slice(0, middle) + '...';

      if (element.scrollHeight <= maxHeight) {
        low = middle + 1;
      } else {
        high = middle;
      }
    }

    return text.slice(0, high - 1) + '...';
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.applyEllipsis());
      this.resizeObserver.observe(this.el.nativeElement);
    }
  }
}
