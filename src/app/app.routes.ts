import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/components/dashboard.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];
