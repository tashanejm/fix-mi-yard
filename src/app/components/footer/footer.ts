import { Component, computed, Signal } from '@angular/core';
import { Base } from '../../common/base';
import { MenuItem } from 'primeng/api';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { Divider } from 'primeng/divider';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [
    RouterLink,
    NgOptimizedImage,
    Divider,
    TranslatePipe
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer extends Base {
  public items$!: Signal<MenuItem[]>;

  constructor() {
    super();
    this.computeItems();
  }

  protected override initDesignToken(): void {
    this.designToken = {
      divider: {
        borderColor: 'var(--footer-divider-border-color)'
      }
    };
  }

  private computeItems(): void {
    this.items$ = computed(() => {
      return [
        {
          label: this.translateService.instant('common.fields.product'),
          id: 'product',
          items: [
            {
              label: this.translateService.instant('page.whatIsFixMiYard.title'),
              id: 'what-is-fix-mi-yard',
              routerLink: this.navigationRoute.ABOUT_US
            },
            {
              label: this.translateService.instant('page.forContractors.title'),
              id: 'for-contractors',
              routerLink: this.navigationRoute.FOR_CONTRACTORS
            },
            {
              label: this.translateService.instant('page.services.title'),
              id: 'services',
              routerLink: this.navigationRoute.SERVICES
            }
          ]
        },
        {
          label: this.translateService.instant('common.fields.company'),
          id: 'company',
          items: [
            {
              label: this.translateService.instant('page.blog.title'),
              id: 'blog',
              routerLink: this.navigationRoute.BLOG
            },
            {
              label: this.translateService.instant('page.news.title'),
              id: 'news',
              routerLink: this.navigationRoute.NEWS
            },
            {
              label: this.translateService.instant('page.contact.title'),
              id: 'contact',
              routerLink: this.navigationRoute.CONTACT
            }
          ]
        },
        {
          label: this.translateService.instant('common.fields.social'),
          id: 'social',
          items: [
            {
              label: this.translateService.instant('common.fields.facebook'),
              id: 'facebook',
              url: this.navigationRoute.FACEBOOK,
              target: '_blank'
            },
            {
              label: this.translateService.instant('common.fields.instagram'),
              id: 'instagram',
              url: this.navigationRoute.INSTAGRAM,
              target: '_blank'
            }
          ]
        }
        // {
        //   label: this.translateService.instant('common.fields.legal'),
        //   id: 'legal',
        //   items: [
        //     {
        //       label: this.translateService.instant('page.privacyPolicy.title'),
        //       id: 'privacy-policy',
        //       routerLink: this.navigationRoute.PRIVACY_POLICY
        //     },
        //     {
        //       label: this.translateService.instant('page.termsOfService.title'),
        //       id: 'terms-of-service',
        //       routerLink: this.navigationRoute.TERMS_OF_SERVICE
        //     }
        //   ]
        // }
      ];
    });
  }
}
