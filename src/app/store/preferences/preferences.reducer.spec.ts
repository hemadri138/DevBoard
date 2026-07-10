import { PreferencesActions } from './preferences.actions';
import {
  initialPreferencesState,
  preferencesReducer
} from './preferences.reducer';

describe('preferencesReducer', () => {
  it('toggles between dark and light themes', () => {
    const lightState = preferencesReducer(
      initialPreferencesState,
      PreferencesActions.toggleTheme()
    );
    const darkState = preferencesReducer(
      lightState,
      PreferencesActions.toggleTheme()
    );

    expect(lightState.theme).toBe('light');
    expect(darkState.theme).toBe('dark');
  });
});
