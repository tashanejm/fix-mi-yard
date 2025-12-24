import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class AppTitleStrategy extends TitleStrategy {
  private readonly title: WritableSignal<string>;

  private readonly titleService: Title = inject(Title);
  private readonly translateService: TranslateService;

  constructor() {
    super();
    this.title = signal<string>('');
    this.translateService = inject<TranslateService>(TranslateService);
    this.titleEffect();
  }

  public override updateTitle(snapshot: RouterStateSnapshot): void {
    this.title.set(this.translateService.instant(this.buildTitle(snapshot) ?? '') as string);
  }

  private titleEffect(): void {
    effect(() => {
      if (this.title()) {
        this.titleService.setTitle(this.title());
      }
    });
  }
}
