import { UserModule } from './feature/user/user.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './core/authentication/components/registration/registration.component';
import { LoginComponent } from './core/authentication/components/login/login.component';
import { HomeComponent } from './core/authentication/components/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminComponent } from './feature/admin/admin.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home',component:HomeComponent},
  {
    path: 'admin',
    loadChildren: () =>
      import('./feature/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'manager',
    loadChildren: () =>
      import('./feature/manager/manager.module').then((m) => m.ManagerModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./feature/user/user.module').then((m) => m.UserModule), 
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
