import { createReducer, on } from '@ngrx/store';

import { FiltersActions } from './filters.actions';

export type DateRangePreset = '7d' | '30d' | '90d';

export interface DateRange {
  readonly preset: DateRangePreset;
  readonly since: string;
  readonly until: string;
}

export interface FiltersState {
  readonly dateRange: DateRange;
}

export const initialFiltersState: FiltersState = {
  dateRange: buildDateRange('30d')
};

export const filtersReducer = createReducer(
  initialFiltersState,
  on(
    FiltersActions.setDateRange,
    (state, { preset }): FiltersState => ({
      ...state,
      dateRange: buildDateRange(preset)
    })
  )
);

export function buildDateRange(preset: DateRangePreset): DateRange {
  const until = new Date();
  const since = new Date(until);
  since.setDate(until.getDate() - toDays(preset));

  return {
    preset,
    since: since.toISOString(),
    until: until.toISOString()
  };
}

function toDays(preset: DateRangePreset): number {
  const daysByPreset: Record<DateRangePreset, number> = {
    '7d': 7,
    '30d': 30,
    '90d': 90
  };

  return daysByPreset[preset];
}
