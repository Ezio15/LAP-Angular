import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

 
const appRoutes: Routes = [
   
    { path: 'login', component: LoginComponent },
   
    // otherwise redirect to home
    { path: '**', redirectTo: '/login' }
];
 
export const routing = RouterModule.forRoot(appRoutes);

