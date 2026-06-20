import { Directive, inject, Signal } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MaterialSymbol } from './enum/material-symbols';
import { FieldLength } from './enum/field-length';
import { NavigationRoute } from './constant/navigation-route.enum';

/**
 * A recursive, flexible type for design tokens.
 * - TokenValue can be a primitive, an object map, or an array of tokens.
 * - Use DesignTokenMap when you expect an object root (most common case).
 *
 * If you want stricter typing, you can make `Base` generic (e.g. `Base<T extends DesignTokenMap>`)
 * and declare a concrete token shape in subclasses.
 */
export type DesignToken = string | number | boolean | DesignTokenMap | DesignToken[];
export interface DesignTokenMap {
  [key: string]: DesignToken
}

@Directive()
export class Base {
  protected readonly translateService: TranslateService;
  protected readonly materialSymbols: typeof MaterialSymbol;
  protected readonly fieldLength: typeof FieldLength;
  protected readonly navigationRoute: typeof NavigationRoute;
  protected readonly languageChange: Signal<LangChangeEvent | undefined>;
  // Use a flexible, typed structure instead of `any` so callers can rely on helpers
  protected designToken?: DesignTokenMap;

  // protected readonly scopedToken;

  constructor() {
    this.translateService = inject(TranslateService);
    this.languageChange = toSignal(this.translateService.onLangChange);
    this.materialSymbols = MaterialSymbol;
    this.fieldLength = FieldLength;
    this.navigationRoute = NavigationRoute;
    this.initDesignToken();
    // this.scopedToken = scopedDesignToken;
  }

  protected initDesignToken(): void {
    /* Override if needed. */
  }

  /**
   * Safely read a design token by path (dot-separated or array of keys).
   * Returns undefined if any step is missing or not an object.
   */
  protected getDesignToken(path: string | string[]): DesignToken | undefined {
    if (!this.designToken) return undefined;
    const keys = Array.isArray(path) ? path : path.split('.').filter(Boolean);
    let current: unknown = this.designToken;
    for (const key of keys) {
      if (current == null || typeof current !== 'object') return undefined;
      current = (current as Record<string, unknown>)[key];
    }
    return current as DesignToken | undefined;
  }

  /**
   * Read a token and return a fallback if not present.
   */
  protected getDesignTokenOr<T = DesignToken>(path: string | string[], fallback: T): T {
    const v = this.getDesignToken(path) as unknown as T | undefined;
    return v ?? fallback;
  }

  /**
   * Convenience typed getters for common primitive token types.
   */
  protected getDesignTokenString(path: string | string[], fallback = ''): string {
    const v = this.getDesignToken(path);
    return typeof v === 'string' ? v : fallback;
  }

  protected getDesignTokenNumber(path: string | string[], fallback = 0): number {
    const v = this.getDesignToken(path);
    return typeof v === 'number' ? v : fallback;
  }

  protected getDesignTokenBoolean(path: string | string[], fallback = false): boolean {
    const v = this.getDesignToken(path);
    return typeof v === 'boolean' ? v : fallback;
  }

  /**
   * Checks whether a token exists at a given path.
   */
  protected hasDesignToken(path: string | string[]): boolean {
    return this.getDesignToken(path) !== undefined;
  }
}
