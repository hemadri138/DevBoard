import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

import { GitHubApiService } from '../../core/services/github-api.service';
import { AppState } from '../app.state';
import { FiltersActions } from '../filters/filters.actions';
import { selectDateRange } from '../filters/filters.selectors';
import { WidgetsActions } from './widgets.actions';

@Injectable()
export class WidgetsEffects {
  private readonly trackedRepository = {
    owner: 'angular',
    repo: 'angular'
  };

  readonly loadDashboardData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetsActions.loadDashboardData),
      mergeMap(() => [
        WidgetsActions.loadRepositoryKPI(),
        WidgetsActions.loadRepositoryActivity()
      ])
    )
  );

  readonly reloadActivityOnFilterChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FiltersActions.setDateRange),
      map(() => WidgetsActions.loadRepositoryActivity())
    )
  );

  readonly loadRepositoryKpi$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetsActions.loadRepositoryKPI),
      switchMap(() =>
        this.githubApi
          .getRepositoryKpi(
            this.trackedRepository.owner,
            this.trackedRepository.repo
          )
          .pipe(
            map((kpi) => WidgetsActions.loadRepositoryKPISuccess({ kpi })),
            catchError((error: unknown) =>
              of(
                WidgetsActions.loadRepositoryKPIFailure({
                  error: this.toErrorMessage(error)
                })
              )
            )
          )
      )
    )
  );

  readonly loadRepositoryActivity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WidgetsActions.loadRepositoryActivity),
      concatLatestFrom(() => this.store.select(selectDateRange)),
      switchMap(([, dateRange]) =>
        this.githubApi
          .getRepositoryActivity(
            this.trackedRepository.owner,
            this.trackedRepository.repo,
            dateRange.since,
            dateRange.until
          )
          .pipe(
            map((activity) =>
              WidgetsActions.loadRepositoryActivitySuccess({
                points: activity.points,
                recentItems: activity.recentItems
              })
            ),
            catchError((error: unknown) =>
              of(
                WidgetsActions.loadRepositoryActivityFailure({
                  error: this.toErrorMessage(error)
                })
              )
            )
          )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly githubApi: GitHubApiService,
    private readonly store: Store<AppState>
  ) {}

  private toErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unable to load GitHub repository metrics.';
  }
}
