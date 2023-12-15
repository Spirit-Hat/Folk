import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    const token = localStorage.getItem('jwt-token');


    const requiresAuth = request.headers.has('Authorization');

    if (requiresAuth && token ) {

      console.log("I am hear ")

      const authReq = request.clone({
        setHeaders:{
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }

    return next.handle(request);
  }
}
