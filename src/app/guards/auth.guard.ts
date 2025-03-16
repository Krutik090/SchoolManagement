import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
    map(isAuth => {
      if (!isAuth) {
        console.error('Unauthorized! Redirecting to login...');
        router.navigateByUrl('/');
        return false;
      }
      return true;
    }),
    catchError(() => {
      console.error('Session expired! Redirecting...');
      router.navigateByUrl('/');
      return of(false); //  This returns an Observable<boolean>
    })
  );
};
