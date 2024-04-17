import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../shared/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const accessToken = authStore.accessToken();
  if (accessToken) {
    const authorizationHeader = 'Bearer ' + accessToken;
    req = req.clone({
      setHeaders: {
        Authorization: authorizationHeader,
      },
    });
  }
  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authStore.setAnonymous();
      }
      return throwError(() => error);
    }),
  );
};
