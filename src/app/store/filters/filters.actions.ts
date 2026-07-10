import { createActionGroup, props } from '@ngrx/store';

import { DateRangePreset } from './filters.reducer';

export const FiltersActions = createActionGroup({
  source: 'Filters',
  events: {
    'Set Date Range': props<{ readonly preset: DateRangePreset }>()
  }
});
