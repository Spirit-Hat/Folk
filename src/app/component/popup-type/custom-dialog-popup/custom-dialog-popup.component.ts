import {
  Component,
  ComponentRef,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'fc-custom-dialog-popup',
  templateUrl: './custom-dialog-popup.component.html',
  styleUrls: ['./custom-dialog-popup.component.scss']
})
export class CustomDialogPopupComponent implements OnInit {

  @ViewChild('container', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;
  @ViewChild('popupContainer') popup: ElementRef | undefined;
  @ViewChild('container') header: ElementRef | undefined;
  private cmpRef! : ComponentRef<any>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.cmpRef = this.container.createComponent(this.data.component);
    this.cmpRef.instance.title = false;
  }
  ngAfterViewInit(){
    this.changeHeight(this.cmpRef)
  }
  private changeHeight(cmpRef: ComponentRef<any>) {
    let offset = window.innerWidth <= 700 ? 0 : 20;
    cmpRef.instance.height = this.popup?.nativeElement.getBoundingClientRect().height - this.header?.nativeElement.getBoundingClientRect().height - offset;
  }

  @HostListener('window:resize', ['$event'])
  private WINDOW_RESIZE(){
    this.changeHeight(this.cmpRef)
  }

}
