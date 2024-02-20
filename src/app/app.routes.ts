import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'detail', component: DetailComponent },
];
