import { createReducer, on } from '@ngrx/store';

import { PreferencesActions } from './preferences.actions';

export type ThemeMode = 'dark' | 'light';

export interface PreferencesState {
  readonly theme: ThemeMode;
}

export const initialPreferencesState: PreferencesState = {
  theme: 'dark'
};

export const preferencesReducer = createReducer(
  initialPreferencesState,
  on(
    PreferencesActions.toggleTheme,
    (state): PreferencesState => ({
      ...state,
      theme: state.theme === 'dark' ? 'light' : 'dark'
    })
  )
);
