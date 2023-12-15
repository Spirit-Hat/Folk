import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'fc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FolkCraft';

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.ctrlKey && event.shiftKey ) {
      console.log("I am work ")
      this.clearLocalStorage();
    }
  }

  clearLocalStorage() {
    localStorage.clear();
  }

}
