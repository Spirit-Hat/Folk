import { Component, OnInit } from '@angular/core';
import {SVG} from "../../../environments/environment";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {AuthService} from "../../../service/api/AuthService";


@Component({
  selector: 'fc-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  svg = SVG;
  currentRoute: string | null = 'ORDERS';
  constructor(
    private router: Router,
    private authService:AuthService
  ) { }

  ngOnInit(): void {
    this.currentRoute = localStorage.getItem('admin-path') ? localStorage.getItem('admin-path') : 'ORDERS'
    // @ts-ignore
    this.router.navigate(['admin/'+this.currentRoute.toLowerCase()])
  }
  savePath(newRoute: string){
    this.currentRoute = newRoute;
    localStorage.setItem('admin-path', this.currentRoute)
  }
  LOG_OUT(){
    this.authService.logout();
    this.router.navigate(['']);

  }
  // DELETE_ME(){
  //   this.authService.deleteAccount();
  //   this.router.navigate(['']);
  // }
}
