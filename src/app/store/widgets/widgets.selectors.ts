import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WidgetsState } from './widgets.reducer';

export const selectWidgetsState =
  createFeatureSelector<WidgetsState>('widgets');

export const selectRepositoryKpi = createSelector(
  selectWidgetsState,
  (state) => state.repositoryKpi
);

export const selectWidgetsLoading = createSelector(
  selectWidgetsState,
  (state) => state.loading
);

export const selectWidgetsError = createSelector(
  selectWidgetsState,
  (state) => state.error
);
