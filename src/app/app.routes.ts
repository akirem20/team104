import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FlatsListComponent } from './pages/flat-list/flat-list.component';
import { ProfilesComponent } from './pages/profiles/profiles.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';

import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'flat-list', component: FlatsListComponent, canActivate: [AuthGuard] },
  { path: 'Profile', component: ProfilesComponent, canActivate: [AuthGuard] },
  {path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];