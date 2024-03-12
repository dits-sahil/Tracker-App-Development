import { UserModule } from './feature/user/user.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './core/authentication/components/registration/registration.component';
import { LoginComponent } from './core/authentication/components/login/login.component';
import { HomeComponent } from './core/authentication/components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { unauthGuard } from './core/guards/unauth.guard';
import { userRoleConfig } from './core/constant/User.config';
import { ForgotPasswordComponent } from './core/authentication/components/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,canActivate:[unauthGuard] },
  { path: 'register', component: RegistrationComponent,canActivate:[unauthGuard] },
  { path: 'home',component:HomeComponent,canActivate:[roleGuard]},
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  {
    path: 'admin',
    loadChildren: () =>
      import('./feature/admin/admin.module').then((m) => m.AdminModule),
      canActivate:[AuthGuard],
      data:{role:userRoleConfig.ADMIN}
  },
  {
    path: 'manager',
    loadChildren: () =>
      import('./feature/manager/manager.module').then((m) => m.ManagerModule),
      canActivate:[AuthGuard],
      data:{role:userRoleConfig.MANAGER}
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./feature/user/user.module').then((m) => m.UserModule),
      canActivate:[AuthGuard],
      data:{role:userRoleConfig.REGULARUSER}
  },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', redirectTo: '404' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
