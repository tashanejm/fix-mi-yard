import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import Material from '@primeuix/themes/material';

import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { provideHttpClient } from '@angular/common/http';
import { AppTitleStrategy } from './core/app-title.strategy';
import { appInitializer } from './core/app.init';
import { ENGLISH_US } from './common/constant/language.constant';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: TitleStrategy, useClass: AppTitleStrategy },
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    // provideAnimationsAsync(),
    provideAppInitializer(appInitializer),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Material
      }
    }),
    provideTranslateService({
      fallbackLang: ENGLISH_US,
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' })
    })
  ]
};
