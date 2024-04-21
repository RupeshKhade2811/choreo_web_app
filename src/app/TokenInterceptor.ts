import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';
// Assuming AuthService handles token retrieval





@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthServiceService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(request.url.includes('/dropDowns') ||request.url.includes('api/endpoint1') ||request.url.includes('api/endpoint1') ||
    request.url.includes('api/endpoint1') ||request.url.includes('api/endpoint1') ||request.url.includes('api/endpoint1') ||
    request.url.includes('api/endpoint1') ||request.url.includes('api/endpoint1') ){
      return this.authService.getToken().pipe(
        switchMap((token: string) => {
          // Clone the request and add the obtained token to the headers
          const authReq = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });
          // Pass the cloned request to the next handler
          return next.handle(authReq);
        })
      );
    }

    return next.handle(request);
   
  }
}
