import {
  ApplicationConfig,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { basicPreset } from './core/theme/basic/basic.preset';
import { appInitializer } from './core/app.init';
import { ENGLISH_US } from './core/common/constant/language.constant';
import { AppTitleStrategy } from './core/common/app-title.strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAppInitializer(appInitializer),
    providePrimeNG({
      theme: {
        preset: basicPreset,
        options: {
          ripple: true,
          prefix: 'jm'
        }
      }
    }),
    provideTranslateService({
      defaultLanguage: ENGLISH_US,
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient): TranslateHttpLoader => new TranslateHttpLoader(http, './i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
    { provide: TitleStrategy, useClass: AppTitleStrategy }
  ]
};
