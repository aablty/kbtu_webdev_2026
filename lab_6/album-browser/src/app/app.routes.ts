import { Routes } from '@angular/router';
import {
  HomePage,
  AlbumsListComponent,
  AlbumDetailComponent,
  AboutPageComponent,
  AlbumPhotosComponent,
} from '@/app/components';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage, pathMatch: 'full' },
  { path: 'about', component: AboutPageComponent },
  { path: 'albums', component: AlbumsListComponent, pathMatch: 'full' },
  { path: 'albums/:id', component: AlbumDetailComponent },
  { path: 'albums/:id/photos', component: AlbumPhotosComponent },
];
