import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (res: any) => {
  const router: Router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user')!);
  if (!user) return router.createUrlTree(['/login'])
  if (user.role == 1 && res.data.role == user.role) return true
  if (user.role == 2 && res.data.role == user.role) return true
  if (user.role == 3 && res.data.role == user.role) return true
  router.navigate(['/home'])
  return false;
};
