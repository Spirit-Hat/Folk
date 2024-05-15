// import {Component, OnInit, OnDestroy, ElementRef, HostListener} from '@angular/core';
// import React  from "react";
// import ReactDOM from 'react-dom';
//
// import helloAngular from "./TestReacComponent";
// @Component({
//   selector: 'fc-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit, OnDestroy {
//   title = 'FolkCraft';
//
//   @HostListener('window:keydown', ['$event'])
//   handleKeyboardEvent(event: KeyboardEvent) {
//     if (event.ctrlKey && event.shiftKey ) {
//       console.log("I am work ")
//       this.clearLocalStorage();
//     }
//   }
//   constructor(private el: ElementRef) {}
//
//   ngOnInit() {
//     this.renderReactComponent();
//   }
//
//   ngOnDestroy() {
//     // Properly unmount the React component to clean up its event listeners and state
//     ReactDOM.unmountComponentAtNode(this.reactComponentContainer);
//   }
//
//   clearLocalStorage() {
//     localStorage.clear();
//   }
//   private get reactComponentContainer() {
//     // Assuming there's an element with the ID 'react-container' in your Angular component's template
//     return this.el.nativeElement.querySelector('#react-container');
//   }
//
//   private renderReactComponent() {
//     ReactDOM.render(React.createElement(helloAngular), this.reactComponentContainer);
//   }
//
// }




import {Component, OnInit, OnDestroy, ElementRef, HostListener} from '@angular/core';
import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import "./Reactmap/App.css"
import helloAngular from "./TestReacComponent";
import AppReact from "./Reactmap/AppReact";
import BodyWrapper from "./Reactmap/components/BodyWrapper";

@Component({
  selector: 'fc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'FolkCraft';

  private reactRoot: ReactDOMClient.Root | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Ensure the container is available in ngOnInit lifecycle hook
    this.renderReactComponent();
  }

  ngOnDestroy() {
    // Properly unmount the React component
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey) {
      console.log("Shortcut activated");
      this.clearLocalStorage();
    }
  }

  clearLocalStorage() {
    localStorage.clear();
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
