import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FiltersFacade } from '../../../../store/filters/filters.facade';
import { DateRangePreset } from '../../../../store/filters/filters.reducer';

interface DateRangeOption {
  readonly value: DateRangePreset;
  readonly label: string;
}

@Component({
  selector: 'app-filter-panel',
  templateUrl: './filter-panel.component.html',
  styleUrl: './filter-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterPanelComponent {
  readonly dateRangePreset$ = this.filtersFacade.dateRangePreset$;
  readonly dateRangeSummary$ = this.filtersFacade.dateRangeSummary$;
  readonly dateRangeOptions: readonly DateRangeOption[] = [
    { value: '7d', label: '7 days' },
    { value: '30d', label: '30 days' },
    { value: '90d', label: '90 days' }
  ];

  constructor(private readonly filtersFacade: FiltersFacade) {}

  setDateRange(preset: DateRangePreset): void {
    this.filtersFacade.setDateRange(preset);
  }
}
