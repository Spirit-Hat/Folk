import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {ProductDTO, STATUS} from "../../../../interface/product";
import {SVG} from "../../../../environments/environment";

@Component({
  selector: 'fc-strip-product',
  templateUrl: './strip-product.component.html',
  styleUrls: ['./strip-product.component.scss']
})
export class StripProductComponent implements OnInit {

  @Input() data: ProductDTO[] = [];
  @ViewChild('carousel') carousel!:ElementRef<HTMLDivElement>;

  @Input() amount: any;
  public widthTile: any;
  public visibleCount: number = 5;
  public offsetScale: number = 0;
  public offset:any;
  public end: boolean = false;
  public svg = SVG;

  constructor() {
    // this.amount = Object.keys(this.data).length;

  }

  ngOnInit(): void {

  }
  ngAfterViewInit(): void{
    this.windowScale()
  }
  @HostListener('window:resize', ['$event'])
  private windowScale(){
    let widthWINDOW =this.carousel.nativeElement.getBoundingClientRect().width
    widthWINDOW <= 650 ? this.visibleCount = 3 :
      widthWINDOW <= 1000 ? this.visibleCount = 4 :
        widthWINDOW <= 1500 ? this.visibleCount = 5 :
          this.visibleCount = 6;
    this.widthTile = this.carousel.nativeElement.getBoundingClientRect().width / this.visibleCount;
    this.carousel.nativeElement.classList.add('moving');
  }
  isEndLine(){
    this.carousel.nativeElement.classList.remove('moving');
    this.end = this.visibleCount * (Math.abs(this.offsetScale)+1) > this.amount
  }
  calculateOffset(){
    return this.widthTile * (this.offsetScale + Number(this.end)) * this.visibleCount - Number(this.end) * this.widthTile * (this.amount - this.visibleCount * Math.abs(this.offsetScale))
  }

}
