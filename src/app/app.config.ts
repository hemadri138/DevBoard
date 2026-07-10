import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { appReducers } from './store';
import { WidgetsEffects } from './store/widgets/widgets.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore(appReducers),
    provideEffects(WidgetsEffects),
    provideStoreDevtools({
      maxAge: 25,
      connectInZone: true
    })
  ]
};
