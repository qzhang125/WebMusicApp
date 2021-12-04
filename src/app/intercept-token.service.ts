import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptTokenService implements HttpInterceptor{

  constructor(private a: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes("spotify.com")) {
      // clone the request and use the "setHeaders" property to set an "Authorization" header, etc.
      // Clone the existing request, and add the authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${this.a.getToken()}`
        }
      });
    }
    // Pass the request on to the next handler
    return next.handle(request);
  }
}
