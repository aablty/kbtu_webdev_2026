import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { LucideAngularModule, Music, Loader2, Trash2, Search, Save, Camera } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      LucideAngularModule.pick({
        Music,
        Loader2,
        Trash2,
        Search,
        Save,
        Camera
      }),
    ),
  ],
};
