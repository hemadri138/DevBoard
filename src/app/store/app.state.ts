import { WidgetsState } from './widgets/widgets.reducer';

export interface AppState {
  readonly widgets: WidgetsState;
}
