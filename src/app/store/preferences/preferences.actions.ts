import { createActionGroup, emptyProps } from '@ngrx/store';

export const PreferencesActions = createActionGroup({
  source: 'Preferences',
  events: {
    'Toggle Theme': emptyProps()
  }
});
