import { computed, Directive, input, InputSignal, Signal } from '@angular/core';
import { BaseDirective } from './base.directive';
import { SafeHtml } from '@angular/platform-browser';

@Directive({
  selector: 'i[appIcon]',
  host: {
    '[innerHTML]': 'svgIcon()',
    '[class.material-symbols-rounded]': 'true'
  }
})
export class Icon extends BaseDirective {
  public readonly icon: InputSignal<string> = input.required({ alias: 'appIcon' });
  protected svgIcon!: Signal<SafeHtml>;

  constructor() {
    super();
    this.computeSvgIcon();
  }

  private computeSvgIcon(): void {
    this.svgIcon = computed(() => this.sanitizer.bypassSecurityTrustHtml(this.icon()));
  }
}
