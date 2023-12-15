import {ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {BasketStorageService} from "../../service/basketStorage.service";

@Injectable({
  providedIn: 'root'
})
export class BasketGuard implements CanActivate {


  constructor(
    private basketService: BasketStorageService,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    if(!this.basketService.checkProductIsNotEmpty()) this.router.navigate([''])
    return this.basketService.checkProductIsNotEmpty();
  }
}
