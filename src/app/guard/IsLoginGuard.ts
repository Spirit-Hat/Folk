import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate{
  private token = localStorage.getItem('jwt-token');

  private jwtHelper = new JwtHelperService();

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const token = this.token;

    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return true;
    }

    this.router.navigate(['/']);
    return true;
  }
}
