import { FiltersState } from './filters/filters.reducer';
import { PreferencesState } from './preferences/preferences.reducer';
import { WidgetsState } from './widgets/widgets.reducer';

export interface AppState {
  readonly filters: FiltersState;
  readonly preferences: PreferencesState;
  readonly widgets: WidgetsState;
}
