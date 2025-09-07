import { Component, computed, Signal } from '@angular/core';
import { Base } from '../../../core/common/base';
import { SelectKey } from './select-key';
import { QuickSelectionModel } from './quick-selection.model';
import { TranslatePipe } from '@ngx-translate/core';
import { ButtonDirective, ButtonIcon, ButtonLabel } from 'primeng/button';

@Component({
  selector: 'app-quick-selection',
  imports: [
    TranslatePipe,
    ButtonDirective,
    ButtonIcon,
    ButtonLabel
  ],
  templateUrl: './quick-selection.html',
  styleUrl: './quick-selection.scss'
})
export class QuickSelection extends Base {
  public selections: Signal<QuickSelectionModel[]>;
  private readonly selectKey: typeof SelectKey;

  constructor() {
    super();
    this.selectKey = SelectKey;
    this.computeQuickSelection();
    this.computeVisibleQuickSelect();
  }

  private computeQuickSelection(): void {
    this.selections = computed(() => {
      return [
        {
          label: 'common.actions.handyperson',
          key: this.selectKey.HANDY_PERSON,
          icon: this.materialSymbols.HANDYMAN,
          id: 'handy-person'
        },
        {
          label: 'common.actions.landscaping',
          key: this.selectKey.LANDSCAPING,
          icon: this.materialSymbols.GRASS,
          id: 'landscaping'
        },
        {
          label: 'common.actions.plumbing',
          key: this.selectKey.PLUMBING,
          icon: this.materialSymbols.PLUMBING,
          id: 'plumbing'
        },
        {
          label: 'common.actions.electrical',
          key: this.selectKey.ELECTRICAL,
          icon: this.materialSymbols.ELECTRIC_BOLT,
          id: 'electrical'
        },
        {
          label: 'common.actions.remodeling',
          key: this.selectKey.REMODELING,
          icon: this.materialSymbols.HOME_IMPROVEMENT_AND_TOOLS,
          id: 'remodeling'
        },
        {
          label: 'common.actions.roofing',
          key: this.selectKey.ROOFING,
          icon: this.materialSymbols.ROOFING,
          id: 'roofing'
        },
        {
          label: 'common.actions.painting',
          key: this.selectKey.PAINTING,
          icon: this.materialSymbols.FORMAT_PAINT,
          id: 'painting'
        },
        {
          label: 'common.actions.cleaning',
          key: this.selectKey.CLEANING,
          icon: this.materialSymbols.CLEANING_SERVICES,
          id: 'cleaning'
        },
        {
          label: 'common.actions.hvac',
          key: this.selectKey.HVAC,
          icon: this.materialSymbols.HVAC,
          id: 'hvac'
        },
        {
          label: 'common.actions.windows',
          key: this.selectKey.WINDOWS,
          icon: this.materialSymbols.WINDOW,
          id: 'windows'
        },
        {
          label: 'common.actions.concrete',
          key: this.selectKey.CONCRETE,
          icon: this.materialSymbols.ENGINEERING,
          id: 'concrete'
        }
      ];
    });
  }

  public onClick(): void {
    console.log('icon clicked')
  }

  private computeVisibleQuickSelect(): void {
    /*todo: compute visible quickSelect with linked signal*/
  }

}
