import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { RepositoryKpi } from '../../core/models/github-repository.model';

export const WidgetsActions = createActionGroup({
  source: 'Widgets',
  events: {
    'Load Repository KPI': emptyProps(),
    'Load Repository KPI Success': props<{ readonly kpi: RepositoryKpi }>(),
    'Load Repository KPI Failure': props<{ readonly error: string }>()
  }
});
