import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Directive, inject, Signal } from '@angular/core';
import { MaterialSymbol } from './enum/material-symbols';
import { FieldLength } from '../../common/enum/field-length';
import { toSignal } from '@angular/core/rxjs-interop';
import { scopedDesignToken } from '../theme/basic/scoped-design-token';

@Directive()
export class Base {
  protected readonly translateService: TranslateService;
  protected readonly materialSymbols: typeof MaterialSymbol;
  protected readonly fieldLength: typeof FieldLength;
  protected readonly languageChange: Signal<LangChangeEvent>;
  protected readonly scopedToken;

  constructor() {
    this.translateService = inject(TranslateService);
    this.languageChange = toSignal(this.translateService.onLangChange.asObservable());
    this.materialSymbols = MaterialSymbol;
    this.fieldLength = FieldLength;
    this.scopedToken = scopedDesignToken;
  }
}
