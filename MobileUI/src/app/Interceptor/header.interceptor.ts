import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpEventType,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError} from 'rxjs';
import { AccountService } from '../Services/account.service';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private accountService : AccountService,
    private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

            request = request.clone({
                setHeaders: { Authorization: `${this.accountService.getToken()}` }
            });


            return next.handle(request).pipe(catchError(x=>this.handleAuthError(x)));
  }
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
        //navigate /delete cookies or whatever
        //yahan tm logout krwaogy yani tm local storage se token wagera sb clear krdogy
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate([""]);
        // this.router.navigateByUrl(`/login`);
        // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
        return of(err.message); // or EMPTY may be appropriate here
    }
    return throwError(err);
}
}
