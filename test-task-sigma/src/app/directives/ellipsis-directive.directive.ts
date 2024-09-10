import { Directive, ElementRef, HostListener, Input, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appEllipsis]',
  standalone: true
})
export class EllipsisDirective implements AfterViewInit {
  @Input() lines: number = 2;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('window:resize') 
  onResize() {
    this.applyEllipsis();
  }

  ngAfterViewInit() {
    this.applyEllipsis();
  }

  applyEllipsis() {
    const element = this.el.nativeElement;
    const lineHeight = parseInt(getComputedStyle(element).lineHeight, 10);
    const maxHeight = lineHeight * this.lines;

    if (element.scrollHeight > maxHeight) {
      let text = element.innerText;
      while (element.scrollHeight > maxHeight) {
        text = text.slice(0, -1);
        element.innerText = text + '...';
      }
    }
  }
}
