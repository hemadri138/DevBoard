import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { PreferencesActions } from './preferences.actions';
import {
  selectTheme,
  selectThemeToggleLabel
} from './preferences.selectors';

@Injectable({ providedIn: 'root' })
export class PreferencesFacade {
  readonly theme$ = this.store.select(selectTheme);
  readonly themeToggleLabel$ = this.store.select(selectThemeToggleLabel);

  constructor(private readonly store: Store<AppState>) {}

  toggleTheme(): void {
    this.store.dispatch(PreferencesActions.toggleTheme());
  }
}
