import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { CarpoolEffect, carpoolFeature } from '../store';
import { settingsFeature } from '../store/settings';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideEffects([ CarpoolEffect ]),
    provideStore({
      carpool: carpoolFeature.reducer,
      settings: settingsFeature.reducer
    }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
