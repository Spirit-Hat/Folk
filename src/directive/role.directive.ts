import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import {AuthService} from "../service/api/AuthService";


@Directive({
  selector: '[appRole]'
})
export class RoleDirective {

  private roles: Array<string> = [];

  constructor(private templateRef: TemplateRef<any>,
              private viewContainerRef: ViewContainerRef,
              private authService: AuthService) { }

  @Input()
  set appRole(roles: Array<string>) {
    this.roles = roles;
    this.checkRole();
  }

  private checkRole() {
    if (this.authService.hasRole(this.roles)) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
