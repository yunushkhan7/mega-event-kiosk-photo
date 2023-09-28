
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';


@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor(private jwtService:JwtService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

     const token = sessionStorage.getItem('token');
      if (token) {
        req = req.clone({
          setHeaders: {
            authentication : `${this.jwtService.getToken()}`
          }
        });

      }

    return next.handle(req);
  }


}
