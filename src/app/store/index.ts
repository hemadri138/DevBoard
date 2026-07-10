import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';
import { filtersReducer } from './filters/filters.reducer';
import { preferencesReducer } from './preferences/preferences.reducer';
import { widgetsReducer } from './widgets/widgets.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  filters: filtersReducer,
  preferences: preferencesReducer,
  widgets: widgetsReducer
};
