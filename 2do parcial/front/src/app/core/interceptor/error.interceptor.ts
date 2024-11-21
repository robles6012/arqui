import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {AlertService} from "@app/core/services/alert.service";
import {AuthService} from "@app/modules/auth/services/auth.service";
import {LoadingService} from "@app/core/services/loading.service";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const _alert = inject(AlertService);
  const _auth = inject(AuthService);
  const _loading = inject(LoadingService);

  return next(req).pipe(
    catchError((error) => {
      console.log(error)
      console.log(error.status)
      _loading.hide();
      switch (error.status) {
        case 401: {
          if (error.error.msg === 'authorization required') {
            _alert.warning('Tiempo expirado, vuelve a iniciar sesión');
            _auth.logout();
          } else {
            _alert.warning(error.error.msn);
          }
          break;
        }
        default: {
          const errorMessage = `Tenemos problemas, reintenta mas tarde... (Error: ${error.status} - ${error.message})`;
          _alert.error(errorMessage);
        }
      }
      return throwError(error);
    })
  );
};
