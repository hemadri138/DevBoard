import { createFeatureSelector, createSelector } from '@ngrx/store';

import { FiltersState } from './filters.reducer';

export const selectFiltersState =
  createFeatureSelector<FiltersState>('filters');

export const selectDateRange = createSelector(
  selectFiltersState,
  (state) => state.dateRange
);

export const selectDateRangePreset = createSelector(
  selectDateRange,
  (dateRange) => dateRange.preset
);

export const selectDateRangeSummary = createSelector(
  selectDateRange,
  (dateRange) => {
    const since = new Date(dateRange.since).toLocaleDateString();
    const until = new Date(dateRange.until).toLocaleDateString();

    return `${since} - ${until}`;
  }
);
