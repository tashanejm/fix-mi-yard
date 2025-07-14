import { TranslateService } from '@ngx-translate/core';
import { Directive, inject } from '@angular/core';

@Directive()
export class Base {
  protected translateService: TranslateService;

  constructor() {
    this.translateService = inject(TranslateService);
  }
}
