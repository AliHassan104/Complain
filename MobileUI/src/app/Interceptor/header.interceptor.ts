import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';
import { Observable, throwError ,  } from 'rxjs';
import { tap , filter , catchError} from 'rxjs/operators';

import { AccountService } from '../Services/account.service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private accountService : AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const account = this.accountService.accountValue;
        // const isLoggedIn = account?.token;
        // const isApiUrl = request.url.startsWith(environment.apiUrl);
        // if (isLoggedIn && isApiUrl) {
          // console.log(`${this.accountService.getToken()}`);

            request = request.clone({
                setHeaders: { Authorization: `${this.accountService.getToken()}` }
            });

            // return next.handle(request).pipe(tap(event=>{
            //   console.log(event);
            //   console.log("Response From Interceptor");
            //   if (event.type === HttpEventType.Response) {
            //     console.log(event.body);
            //   }
            // }))
            return next.handle(request)
            .pipe(
              filter(event => event instanceof HttpResponse),
              catchError(error => {
                if(error.status === 500) {
                  const requestId = error.headers.get('request-id');
                }
                return throwError(error);
              })
            );

    // return next.handle(request)
    // .pipe(
      // retry(2),
      // catchError()
    // )
  }
}
