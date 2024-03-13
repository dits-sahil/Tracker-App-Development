import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { userRoleConfig } from '../constant/User.config';

export const AuthGuard: CanActivateFn = (res: any) => {
    const router: Router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user')!);
  if (!user) return router.createUrlTree(['/login'])
  if (user.role == userRoleConfig.ADMIN && res.data.role == user.role) return true
  if (user.role == userRoleConfig.MANAGER && res.data.role == user.role) return true
  if (user.role == userRoleConfig.REGULARUSER && res.data.role == user.role) return true
  router.navigate(['/home'])
  return false;
};
