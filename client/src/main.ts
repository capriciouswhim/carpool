import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './config/app.config';
import { RootPage } from './page';

bootstrapApplication(RootPage, appConfig)
  .catch((err) => console.error(err));

/* catch unhandled dbl-click events on iOS */
document.addEventListener('dblclick', ($event) => { $event.preventDefault() })