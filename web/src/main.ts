import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './config/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

/* catch unhandled dbl-click events on iOS */
document.addEventListener('dblclick', ($event) => { $event.preventDefault() })