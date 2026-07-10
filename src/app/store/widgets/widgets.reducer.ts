import { createReducer, on } from '@ngrx/store';

import { RepositoryKpi } from '../../core/models/github-repository.model';
import { WidgetsActions } from './widgets.actions';

export interface WidgetsState {
  readonly repositoryKpi: RepositoryKpi | null;
  readonly loading: boolean;
  readonly error: string | null;
}

export const initialWidgetsState: WidgetsState = {
  repositoryKpi: null,
  loading: false,
  error: null
};

export const widgetsReducer = createReducer(
  initialWidgetsState,
  on(WidgetsActions.loadRepositoryKPI, (state): WidgetsState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(
    WidgetsActions.loadRepositoryKPISuccess,
    (state, { kpi }): WidgetsState => ({
      ...state,
      repositoryKpi: kpi,
      loading: false
    })
  ),
  on(
    WidgetsActions.loadRepositoryKPIFailure,
    (state, { error }): WidgetsState => ({
      ...state,
      loading: false,
      error
    })
  )
);
