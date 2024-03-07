import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user')!);
  if (user && user.role == 1){  return router.navigate(['/admin/users'])}
  if (user && user.role == 2){  return router.navigate(['/manager/users'])}
  if (user && user.role == 3){  return router.navigate(['/user/assignments'])}
  router.navigate(['/login'])
  return false;
};
