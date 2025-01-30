import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  { path: '', component: LoginComponent }, 
  { path: 'home', component: HomeComponent }, 
  { path: '**', component: PageNotFoundComponent }
];
