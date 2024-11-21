import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {AuthInterceptor} from "@app/core/interceptor/auth-interceptor/auth.interceptor";
import {errorInterceptor} from "@app/core/interceptor/error.interceptor";


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes),
    provideToastr({
      timeOut: 2000,
    }),
    provideHttpClient(withInterceptorsFromDi(), withInterceptors([errorInterceptor])),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },


  ],
};
