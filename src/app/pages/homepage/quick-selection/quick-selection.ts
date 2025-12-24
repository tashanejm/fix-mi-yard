import { Component, computed, output, OutputEmitterRef, Signal } from '@angular/core';
import { Base } from '../../../common/base';
import { SelectItem } from 'primeng/api';
import { ButtonDirective, ButtonIcon } from 'primeng/button';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-quick-selection',
  imports: [
    ButtonDirective,
    ButtonIcon,
    Ripple
  ],
  templateUrl: './quick-selection.html',
  styleUrl: './quick-selection.scss'
})
export class QuickSelection extends Base {
  public selections!: Signal<SelectItem[]>;
  public readonly selectionChange: OutputEmitterRef<string> = output();

  constructor() {
    super();
    this.computeSelections();
    this.designToken = {
      selection: {
        handyPerson: {
          textPrimaryColor: 'var(--handy-person-icon-color)'
        },
        landscaping: {
          textPrimaryColor: 'var(--landscaping-icon-color)'
        },
        plumbing: {
          textPrimaryColor: 'var(--plumbing-icon-color)'
        },
        electrical: {
          textPrimaryColor: 'var(--electrical-icon-color)'
        },
        cleaning: {
          textPrimaryColor: 'var(--cleaning-icon-color)'
        }
      }
    };
  }

  protected onSelection(selection: SelectItem): void {
    this.selectionChange.emit(selection.label ?? '');
  }

  private computeSelections(): void {
    this.selections = computed(() => {
      return [
        {
          label: this.translateService.instant('common.actions.handyperson'),
          icon: this.materialSymbols.HANDYMAN,
          value: {
            key: 'handyPerson',
            id: 'handy-person',
            data: this.designToken?.selection?.handyPerson
          }
        },
        {
          label: this.translateService.instant('common.actions.landscaping'),
          icon: this.materialSymbols.GRASS,
          value: {
            key: 'landscaping',
            id: 'landscaping',
            data: this.designToken?.selection?.landscaping
          }
        },
        {
          label: this.translateService.instant('common.actions.plumbing'),
          icon: this.materialSymbols.PLUMBING,
          value: {
            key: 'plumbing',
            id: 'plumbing',
            data: this.designToken?.selection?.plumbing
          }
        },
        {
          label: this.translateService.instant('common.actions.electrical'),
          icon: this.materialSymbols.ELECTRICAL_SERVICES,
          value: {
            key: 'electrical',
            id: 'electrical',
            data: this.designToken?.selection?.electrical
          }
        },
        {
          label: this.translateService.instant('common.actions.cleaning'),
          icon: this.materialSymbols.CLEANING_SERVICES,
          value: {
            key: 'cleaning',
            id: 'cleaning',
            data: this.designToken?.selection?.cleaning
          }
        }
      ];
    });
  }
}
