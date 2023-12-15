import { Component, OnInit } from '@angular/core';
import {SVG} from "../../../../environments/environment";

@Component({
  selector: 'fc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }
  svg = SVG;
  ngOnInit(): void {
  }

}
