import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Injectable} from "@angular/core";
import {JwtHelperService} from '@auth0/angular-jwt';

import {map, Observable, Subscription} from "rxjs";
import {AuthService} from "../../service/api/AuthService";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private token = localStorage.getItem('jwt-token');
  private jwtHelper = new JwtHelperService();
  private dataSubscription: Subscription | undefined;
  private isValid$: Observable<boolean>;

  constructor(
    private router: Router,
    private AuthService: AuthService
  ) {
    this.isValid$ = this.AuthService.checkValidToken().pipe(
      map(isValid => {
        if (!isValid || !this.token || this.jwtHelper.isTokenExpired(this.token)) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      })
    );
  }


  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedRoles = route.data['expectedRoles'];
    return this.isValid$.pipe(
      map(isValid => {
        if (!isValid) {
          return false;
        }
        if (typeof this.token === "string") {
          const decodedToken = this.jwtHelper.decodeToken(this.token);
          const userRoles = decodedToken.roles;
          if (!this.checkRole(userRoles, expectedRoles)) {
            this.router.navigate(['/login']);
            return false;
          }
        }
        return true;
      })
    );
  }

  private checkRole(userRoles: string[], expectedRoles: string[]): boolean {
    return expectedRoles.some(role => userRoles.includes(role));
  }

}
