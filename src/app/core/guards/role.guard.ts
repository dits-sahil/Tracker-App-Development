import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { userRoleConfig } from '../constant/User.config';

export const roleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user')!);
  if (user && user.role == userRoleConfig.ADMIN){  return router.navigate(['/admin/dashboard'])}
  if (user && user.role == userRoleConfig.ADMIN){  return router.navigate(['/manager/dashboard'])}
  if (user && user.role == userRoleConfig.ADMIN){  return router.navigate(['/user/dashboard'])}
  router.navigate(['/login'])
  return false;
};
