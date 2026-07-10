import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { WidgetsActions } from './widgets.actions';
import {
  selectRepositoryKpi,
  selectWidgetsError,
  selectWidgetsLoading
} from './widgets.selectors';

@Injectable({ providedIn: 'root' })
export class WidgetsFacade {
  readonly repositoryKpi$ = this.store.select(selectRepositoryKpi);
  readonly loading$ = this.store.select(selectWidgetsLoading);
  readonly error$ = this.store.select(selectWidgetsError);

  constructor(private readonly store: Store<AppState>) {}

  loadRepositoryKpi(): void {
    this.store.dispatch(WidgetsActions.loadRepositoryKPI());
  }
}
