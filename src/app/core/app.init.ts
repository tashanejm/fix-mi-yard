import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ENGLISH_US } from '../common/constant/language.constant';

export function appInitializer(): Observable<unknown> | Promise<unknown> {
  const translateService: TranslateService = inject<TranslateService>(TranslateService);
  translateService.addLangs([ENGLISH_US]);
  translateService.setFallbackLang(ENGLISH_US);
  return translateService.use(ENGLISH_US);
}
