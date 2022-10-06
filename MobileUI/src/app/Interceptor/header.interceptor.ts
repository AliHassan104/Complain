import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
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


    return next.handle(request);
  }
}
