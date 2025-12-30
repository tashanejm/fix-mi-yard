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
import { definePreset } from '@primeuix/themes';

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
        options: {
          darkModeSelector: 'system'
        },
        preset: definePreset(Material, {
          semantic: {
            primary: {
              50: '{sky.50}',
              100: '{sky.100}',
              200: '{sky.200}',
              300: '{sky.300}',
              400: '{sky.400}',
              500: '{sky.500}',
              600: '{sky.600}',
              700: '{sky.700}',
              800: '{sky.800}',
              900: '{sky.900}',
              950: '{sky.950}'
            },
            surface: {
              0: '#ffffff',
              50: '{slate.50}',
              100: '{slate.100}',
              200: '{slate.200}',
              300: '{slate.300}',
              400: '{slate.400}',
              500: '{slate.500}',
              600: '{slate.600}',
              700: '{slate.700}',
              800: '{slate.800}',
              900: '{slate.900}',
              950: '{slate.950}'
            },
            colorScheme: {
      /*        light: {
                surface: {
                  // Map PrimeNG tokens to Tailwind 4 CSS variables
                  0: '#ffffff',
                  50: 'var(--color-green-50)',
                  100: 'var(--color-green-100)',
                  200: 'var(--color-green-200)',
                  300: 'var(--color-green-300)',
                  400: 'var(--color-green-400)',
                  500: 'var(--color-green-500)',
                  600: 'var(--color-green-600)',
                  700: 'var(--color-green-700)',
                  800: 'var(--color-green-800)',
                  900: 'var(--color-green-900)',
                  950: 'var(--color-green-950)'
                }
              },
              dark: {
                surface: {
                  0: 'var(--color-green-950)', // Background for dark mode
                  50: 'var(--color-green-900)',
                  // ... and so on
                  950: '#000000'
                }
              }*/
            }
          }
        })
      }
    }),
    provideTranslateService({
      fallbackLang: ENGLISH_US,
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' })
    })
  ]
};
