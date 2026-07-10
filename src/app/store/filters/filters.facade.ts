import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { FiltersActions } from './filters.actions';
import { DateRangePreset } from './filters.reducer';
import {
  selectDateRange,
  selectDateRangePreset,
  selectDateRangeSummary
} from './filters.selectors';

@Injectable({ providedIn: 'root' })
export class FiltersFacade {
  readonly dateRange$ = this.store.select(selectDateRange);
  readonly dateRangePreset$ = this.store.select(selectDateRangePreset);
  readonly dateRangeSummary$ = this.store.select(selectDateRangeSummary);

  constructor(private readonly store: Store<AppState>) {}

  setDateRange(preset: DateRangePreset): void {
    this.store.dispatch(FiltersActions.setDateRange({ preset }));
  }
}
