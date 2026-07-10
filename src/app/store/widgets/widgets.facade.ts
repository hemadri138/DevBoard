import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { WidgetsActions } from './widgets.actions';
import {
  selectActivityError,
  selectActivityLoading,
  selectActivityPoints,
  selectKpiError,
  selectKpiLoading,
  selectLoadedCommitCount,
  selectRecentItems,
  selectRepositoryKpi,
} from './widgets.selectors';

@Injectable({ providedIn: 'root' })
export class WidgetsFacade {
  readonly repositoryKpi$ = this.store.select(selectRepositoryKpi);
  readonly activityPoints$ = this.store.select(selectActivityPoints);
  readonly recentItems$ = this.store.select(selectRecentItems);
  readonly loadedCommitCount$ = this.store.select(selectLoadedCommitCount);
  readonly kpiLoading$ = this.store.select(selectKpiLoading);
  readonly activityLoading$ = this.store.select(selectActivityLoading);
  readonly kpiError$ = this.store.select(selectKpiError);
  readonly activityError$ = this.store.select(selectActivityError);

  constructor(private readonly store: Store<AppState>) {}

  loadDashboardData(): void {
    this.store.dispatch(WidgetsActions.loadDashboardData());
  }

  loadRepositoryKpi(): void {
    this.store.dispatch(WidgetsActions.loadRepositoryKPI());
  }
}
