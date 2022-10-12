import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse

} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    return next.handle(request).pipe(map((event: HttpEvent<any>) => {
      console.log(request);
      if (event instanceof HttpResponse) {
        let newEvent: HttpEvent<any>;
        newEvent = event.clone({
        });
        console.log(newEvent);
        return newEvent;
      }
    }));





  }
}
