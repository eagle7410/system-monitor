import {Routes} from '@angular/router';
import {AuthGuard} from './_guards/auth.guard';
import {LoginComponent, UsersComponent, UserAddComponent, StatsComponent} from './mainComponets';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  {path: 'user-add', component: UserAddComponent, canActivate: [AuthGuard]},
  {path: 'stats', component: StatsComponent, canActivate: [AuthGuard]}
];
