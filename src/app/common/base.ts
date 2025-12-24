import { Directive, inject, Signal } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MaterialSymbol } from './enum/material-symbols';
import { FieldLength } from './enum/field-length';
import { NavigationRoute } from './constant/navigation-route.enum';

@Directive()
export class Base {
  protected readonly translateService: TranslateService;
  protected readonly materialSymbols: typeof MaterialSymbol;
  protected readonly fieldLength: typeof FieldLength;
  protected readonly navigationRoute: typeof NavigationRoute;
  protected readonly languageChange: Signal<LangChangeEvent | undefined>;
  // protected readonly scopedToken;

  constructor() {
    this.translateService = inject(TranslateService);
    this.languageChange = toSignal(this.translateService.onLangChange);
    this.materialSymbols = MaterialSymbol;
    this.fieldLength = FieldLength;
    this.navigationRoute = NavigationRoute;
    // this.scopedToken = scopedDesignToken;
  }
}
