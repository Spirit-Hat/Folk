import { Component, OnInit } from '@angular/core';
import {SVG} from "../../../environments/environment";
import {AuthService} from "../../../service/api/AuthService";

@Component({
  selector: 'fc-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  svg = SVG;
  logout(){
    this.authService.logout();
  }
  ngOnInit(): void {
  }

}
