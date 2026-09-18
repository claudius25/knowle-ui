import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { environment } from './environments/environment';

if (!environment.production) {
  // On-screen devtools (console/network/elements) so logs are visible on mobile.
  import('eruda').then((eruda) => eruda.default.init());
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
