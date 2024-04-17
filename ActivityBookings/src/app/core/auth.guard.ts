import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../shared/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  if (authStore.isAnonymous()) {
    return router.createUrlTree(['/', 'login']);
  }
  return true;
};
