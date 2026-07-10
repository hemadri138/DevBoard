import { FiltersState } from './filters/filters.reducer';
import { WidgetsState } from './widgets/widgets.reducer';

export interface AppState {
  readonly filters: FiltersState;
  readonly widgets: WidgetsState;
}
