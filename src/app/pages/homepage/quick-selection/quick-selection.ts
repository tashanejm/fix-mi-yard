import { Component, computed, output, OutputEmitterRef, Signal } from '@angular/core';
import { Base } from '../../../common/base';
import { SelectItem } from 'primeng/api';
import { ButtonDirective, ButtonIcon } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { Icon } from '../../../common/directive/icon';

@Component({
  selector: 'app-quick-selection',
  imports: [
    ButtonDirective,
    ButtonIcon,
    Ripple,
    Icon
  ],
  templateUrl: './quick-selection.html',
  styleUrl: './quick-selection.scss'
})
export class QuickSelection extends Base {
  public selections$!: Signal<SelectItem[]>;
  public readonly selectionChange: OutputEmitterRef<string> = output();

  constructor() {
    super();
    this.computeSelections();
  }

  protected onSelection(selection: SelectItem): void {
    this.selectionChange.emit(selection.label ?? '');
  }

  private computeSelections(): void {
    this.selections$ = computed(() => {
      // Register dependency on language change to update translations
      this.languageChange();

      const items = [
        {
          key: 'handyPerson',
          id: 'handy-person',
          label: 'common.actions.handyperson',
          icon: this.materialSymbols.HANDYMAN
        },
        {
          key: 'landscaping',
          id: 'landscaping',
          label: 'common.actions.landscaping',
          icon: this.materialSymbols.GRASS
        },
        { key: 'plumbing', id: 'plumbing', label: 'common.actions.plumbing', icon: this.materialSymbols.PLUMBING },
        {
          key: 'electrical',
          id: 'electrical',
          label: 'common.actions.electrical',
          icon: this.materialSymbols.ELECTRICAL_SERVICES
        },
        {
          key: 'cleaning',
          id: 'cleaning',
          label: 'common.actions.cleaning',
          icon: this.materialSymbols.CLEANING_SERVICES
        },
        { key: 'concrete', id: 'concrete', label: 'common.actions.concrete', icon: this.materialSymbols.BRICK },
        { key: 'painting', id: 'painting', label: 'common.actions.painting', icon: this.materialSymbols.FORMAT_PAINT },
        { key: 'roofing', id: 'roofing', label: 'common.actions.roofing', icon: this.materialSymbols.ROOFING },
        { key: 'fencing', id: 'fencing', label: 'common.actions.fencing', icon: this.materialSymbols.FENCE },
        { key: 'hvac', id: 'hvac', label: 'common.actions.hvac', icon: this.materialSymbols.AIR },
        {
          key: 'remodeling',
          id: 'remodeling',
          label: 'common.actions.remodeling',
          icon: this.materialSymbols.HOME_REPAIR_SERVICE
        },
        { key: 'windows', id: 'windows', label: 'common.actions.windows', icon: this.materialSymbols.WINDOW }
      ];

      return items.map(item => ({
        label: this.translateService.instant(item.label),
        icon: item.icon,
        value: {
          key: item.key,
          id: item.id,
          data: {
            textPrimaryColor: `var(--${item.id}-icon-color)`
          }
        }
      }));
    });
  }
}
