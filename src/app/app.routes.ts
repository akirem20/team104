import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth.guard'; // Import your AuthGuard


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: 'app',
        component: AppComponent,
        canActivate: [AuthGuard],
    },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
