import {Component, ElementRef, OnInit} from '@angular/core';
import * as ReactDOMClient from "react-dom/client";
import React from "react";
import AppReact from "../../../Reactmap/AppReact";

@Component({
  selector: 'fc-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  private reactRoot: ReactDOMClient.Root | null = null;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Ensure the container is available in ngOnInit lifecycle hook
    this.renderReactComponent();
  }

  private renderReactComponent() {
    // const container = this.el.nativeElement.querySelector('#reacng s - t-container');
    const container = this.el.nativeElement.querySelector('#react-container');

    if (container) {
      // Use createRoot for React 18
      this.reactRoot = ReactDOMClient.createRoot(container);
      this.reactRoot.render(React.createElement(AppReact));
    } else {
      console.error('Target container is not a DOM element.');
    }
  }
}
