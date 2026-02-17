import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  LucideAngularModule,
  Heart,
  Sparkles,
  ShoppingBag,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Send,
  MessageCircle,
  Star,
  ExternalLink,
} from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      LucideAngularModule.pick({
        Heart,
        Sparkles,
        ShoppingBag,
        Search,
        ChevronLeft,
        ChevronRight,
        X,
        Share2,
        Send,
        MessageCircle,
        Star,
        ExternalLink,
      }),
    ),
  ],
};
