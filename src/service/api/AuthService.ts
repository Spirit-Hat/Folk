import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, Observable, of, tap} from "rxjs";
import {environment} from "../../environments/environment";
import {Register} from "../authorization/register";
import { JwtHelperService } from '@auth0/angular-jwt';
import {PopupService} from "../popup.service";
import {Router} from "@angular/router";
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BACKEND = environment.BACKEND_URL;
  private jwtHelper = new JwtHelperService();

  constructor(
    private popupService: PopupService,
    private http: HttpClient,
    private location: Location,
    private router: Router
  ) {
  }

  login(login: string, password: string) {
    return this.http.post<any>(`${this.BACKEND}/auth/login`, {login, password})
      .pipe(
        tap(res => {
            localStorage.setItem('jwt-token', res['jwt-token'])
          }
        )).subscribe({
        error: err => console.error(err),
        next: () => {
          location.reload()
          console.log(this.jwtHelper.decodeToken(<string>localStorage.getItem('jwt-token')))
          this.popupService.dialog.closeAll();
          }
      });

  }
  public registration(user: Register) {
    console.log(user)
    return this.http.post<any>(`${this.BACKEND}/auth/registration`, user)
      .pipe(
        tap(res => {
            localStorage.setItem('jwt-token', res['jwt-token'])
          }
        )).subscribe({
        error: err => console.error(err),
        next: () => {console.log('success registration'); location.reload();}
      });
  }

  logout() {
    location.reload();
    localStorage.removeItem('jwt-token');
    this.router.navigate(['/'])
    this.clearHistory();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt-token')
  }

  public hasRole(expectedRoles: string[]): boolean{
    const token = localStorage.getItem('jwt-token');
    if (!token || this.jwtHelper.isTokenExpired(token)) {
      return false;
    }
    const decodedToken = this.jwtHelper.decodeToken(token);
    const userRoles = decodedToken.roles;

    return expectedRoles.some(role => userRoles.includes(role));
  }


  checkValidToken(): Observable<boolean> {

    const headers = new HttpHeaders({'Authorization': `Bearer`});

    return this.http.get<boolean>(`${this.BACKEND}/security/checkToken`, {headers}).pipe(
      catchError((error) => {
        if (error.status === 403) {
          return of(false);
        }
        throw error;
      }));
  }

  private clearHistory() {
    const currentUrl = this.location.path();
    this.location.replaceState(currentUrl, '', '');
  }
}
