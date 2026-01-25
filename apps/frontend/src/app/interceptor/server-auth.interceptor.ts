import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { EMPTY, Observable, catchError } from 'rxjs';

export const serverAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformServer(platformId)) {
    return next(req);
  }
  const protectedRoutes = ['/dashboards'];
  const isProtected = protectedRoutes.some(url => req.url.includes(url));

  if (isProtected) {
    console.log(`[SSR] Skipping protected request: ${req.url}`);
    return EMPTY; 
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn(`[SSR] Suppressed 401 error for: ${req.url}`);
        return EMPTY;
      }
      throw error;
    })
  );
};