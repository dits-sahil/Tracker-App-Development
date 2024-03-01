import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = () => {
  debugger
  const router: Router = inject(Router);
  const user = JSON.parse(localStorage.getItem('user')!);
  if (!user) {
    debugger
    return router.createUrlTree(['/login']);
  }
  return true;
};
