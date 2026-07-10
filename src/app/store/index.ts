import { ActionReducerMap } from '@ngrx/store';

import { AppState } from './app.state';
import { widgetsReducer } from './widgets/widgets.reducer';

export const appReducers: ActionReducerMap<AppState> = {
  widgets: widgetsReducer
};
