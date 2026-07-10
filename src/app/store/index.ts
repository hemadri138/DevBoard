import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';
import { filtersReducer } from './filters/filters.reducer';
import { widgetsReducer } from './widgets/widgets.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  filters: filtersReducer,
  widgets: widgetsReducer
};
