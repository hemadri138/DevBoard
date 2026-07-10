import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { GitHubApiService } from '../../core/services/github-api.service';
import { WidgetsActions } from './widgets.actions';

@Injectable()
export class WidgetsEffects {
  private readonly trackedRepository = {
    owner: 'angular',
    repo: 'angular'
  };

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

  constructor(
    private readonly actions$: Actions,
    private readonly githubApi: GitHubApiService
  ) {}

  private toErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unable to load GitHub repository metrics.';
  }
}
