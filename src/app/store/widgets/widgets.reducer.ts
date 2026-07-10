import { createReducer, on } from '@ngrx/store';

import {
  ActivityPoint,
  RecentActivityItem,
  RepositoryKpi
} from '../../core/models/github-repository.model';
import { WidgetsActions } from './widgets.actions';

export interface WidgetsState {
  readonly repositoryKpi: RepositoryKpi | null;
  readonly activityPoints: readonly ActivityPoint[];
  readonly recentItems: readonly RecentActivityItem[];
  readonly kpiLoading: boolean;
  readonly activityLoading: boolean;
  readonly kpiError: string | null;
  readonly activityError: string | null;
}

export const initialWidgetsState: WidgetsState = {
  repositoryKpi: null,
  activityPoints: [],
  recentItems: [],
  kpiLoading: false,
  activityLoading: false,
  kpiError: null,
  activityError: null
};

export const widgetsReducer = createReducer(
  initialWidgetsState,
  on(WidgetsActions.loadRepositoryKPI, (state): WidgetsState => ({
    ...state,
    kpiLoading: true,
    kpiError: null
  })),
  on(
    WidgetsActions.loadRepositoryKPISuccess,
    (state, { kpi }): WidgetsState => ({
      ...state,
      repositoryKpi: kpi,
      kpiLoading: false
    })
  ),
  on(
    WidgetsActions.loadRepositoryKPIFailure,
    (state, { error }): WidgetsState => ({
      ...state,
      kpiLoading: false,
      kpiError: error
    })
  ),
  on(WidgetsActions.loadRepositoryActivity, (state): WidgetsState => ({
    ...state,
    activityLoading: true,
    activityError: null
  })),
  on(
    WidgetsActions.loadRepositoryActivitySuccess,
    (state, { points, recentItems }): WidgetsState => ({
      ...state,
      activityPoints: points,
      recentItems,
      activityLoading: false
    })
  ),
  on(
    WidgetsActions.loadRepositoryActivityFailure,
    (state, { error }): WidgetsState => ({
      ...state,
      activityLoading: false,
      activityError: error
    })
  )
);
