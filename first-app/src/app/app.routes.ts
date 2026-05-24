import { Routes } from '@angular/router';
import { World } from './world/world';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'map',
    component: World
  }
];