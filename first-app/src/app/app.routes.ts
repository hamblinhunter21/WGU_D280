import { Routes } from '@angular/router';
import { WorldComponent } from './world/world.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'map',
    component: WorldComponent
  }
];