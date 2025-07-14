import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ENGLISH_US } from './common/constant/language.constant';
import { Observable } from 'rxjs';

export function appInitializer(): Observable<unknown> | Promise<unknown> {
  const translateService: TranslateService = inject(TranslateService);
  translateService.addLangs([ENGLISH_US]);
  translateService.setDefaultLang(ENGLISH_US);
  return translateService.use(ENGLISH_US);
}
