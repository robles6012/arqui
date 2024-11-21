import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '@app/core/services/alert.service';
import { StorageService } from '@app/core/services/storage.service';
import { AuthService } from '@app/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _storage: StorageService,
    private _auth: AuthService,
    private _alertService: AlertService,
    private _router: Router
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = this._storage.getItem<string>('access_token');

    if (request.url === 'http://localhost:3300/auth') {
      return next.handle(request);
    }

    if (access_token) {
      request = this.addTokenHeader(request, access_token);
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Unauthorized - token expired or not valid
          this._auth.logout();
          this._alertService.warning('Tiempo expirado, vuelve a iniciar sesión');
          this._router.navigateByUrl('/login').then(() => {
            location.reload();
          });
        }
        return throwError(error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
