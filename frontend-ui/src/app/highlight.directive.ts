import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  private element = inject(ElementRef);

  constructor() {
    this.element.nativeElement.style.backgroundColor = 'red';
  }

}
