import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PreferencesState } from './preferences.reducer';

export const selectPreferencesState =
  createFeatureSelector<PreferencesState>('preferences');

export const selectTheme = createSelector(
  selectPreferencesState,
  (state) => state.theme
);

export const selectThemeToggleLabel = createSelector(selectTheme, (theme) =>
  theme === 'dark' ? 'Use light mode' : 'Use dark mode'
);
