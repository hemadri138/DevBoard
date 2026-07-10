import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { RepositoryKpi } from '../../core/models/github-repository.model';

export const WidgetsActions = createActionGroup({
  source: 'Widgets',
  events: {
    'Load Dashboard Data': emptyProps(),
    'Load Repository KPI': emptyProps(),
    'Load Repository KPI Success': props<{ readonly kpi: RepositoryKpi }>(),
    'Load Repository KPI Failure': props<{ readonly error: string }>(),
    'Load Repository Activity': emptyProps(),
    'Load Repository Activity Success': props<{
      readonly points: readonly import('../../core/models/github-repository.model').ActivityPoint[];
      readonly recentItems: readonly import('../../core/models/github-repository.model').RecentActivityItem[];
    }>(),
    'Load Repository Activity Failure': props<{ readonly error: string }>()
  }
});
