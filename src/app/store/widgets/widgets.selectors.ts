import { createFeatureSelector, createSelector } from '@ngrx/store';

import { WidgetsState } from './widgets.reducer';

export const selectWidgetsState =
  createFeatureSelector<WidgetsState>('widgets');

export const selectRepositoryKpi = createSelector(
  selectWidgetsState,
  (state) => state.repositoryKpi
);

export const selectActivityPoints = createSelector(
  selectWidgetsState,
  (state) => state.activityPoints
);

export const selectRecentItems = createSelector(
  selectWidgetsState,
  (state) => state.recentItems
);

export const selectKpiLoading = createSelector(
  selectWidgetsState,
  (state) => state.kpiLoading
);

export const selectActivityLoading = createSelector(
  selectWidgetsState,
  (state) => state.activityLoading
);

export const selectKpiError = createSelector(
  selectWidgetsState,
  (state) => state.kpiError
);

export const selectActivityError = createSelector(
  selectWidgetsState,
  (state) => state.activityError
);

export const selectLoadedCommitCount = createSelector(
  selectRecentItems,
  (items) => items.length
);
