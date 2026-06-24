import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Directive()
export class BaseDirective {
  protected readonly el: ElementRef = inject(ElementRef);
  protected readonly renderer: Renderer2 = inject(Renderer2);
  protected readonly sanitizer: DomSanitizer = inject(DomSanitizer);
}
