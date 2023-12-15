import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProductdDTO} from "../../../../service/api/ProductdDTO";
import {ImageService} from "../../../../service/subscribe/image.service";

export interface zoomingData {
  display?: string,
  'background-image': string,
  'background-size': string,
  'background-position'?: string,
}
function getCursorPos(event: MouseEvent, img: HTMLDivElement) {
  let x, y;
  const imgRect = img.getBoundingClientRect();
  x = event.x - imgRect.left;
  y = event.y - imgRect.top;
  return {x: x, y: y};
}

@Component({
  selector: 'fc-product-gallery',
  templateUrl: './product-gallery.component.html',
  styleUrls: ['./product-gallery.component.scss']
})
export class ProductGalleryComponent implements OnInit {

  @ViewChild('imgContainer') productImg!: HTMLImageElement;
  itemList: string[] = [];
  currentImg: number = 0;
  imgWidth: number = 420;
  @Output() zoomingEventEmitter = new EventEmitter<zoomingData>();
  @Input() heightRender!: number ;

  x: number = 0;
  y: number = 0;

  result: zoomingData = {
    display: 'none',
    'background-image': '',
    'background-position': '0 0',
    'background-size': '',
  }

  constructor(
    private imageService:ImageService
  ) {

  }

  ngOnInit(): void {
    this.imageService.itemList$.subscribe((image: string[]) => {
      this.itemList = image;
    });
    console.log(this.itemList)
  }

  getPosition(index: number){
    if (index < this.currentImg) {
      return -Math.abs(index - this.currentImg) * this.imgWidth + 'px';

    } else if (index > this.currentImg) {
      return Math.abs(index - this.currentImg) * this.imgWidth + 'px'

    } else return '0px'
  }

  getNewPosition(newIndex: number){
    this.currentImg = newIndex;
  }

  zoom(event: any, zoom_lens: HTMLElement, imgContainer: HTMLDivElement) {

      const cx = this.heightRender / zoom_lens.offsetWidth;
      const cy = this.heightRender / zoom_lens.offsetHeight;

      this.result['background-image'] = "url('" + this.itemList[this.currentImg] + "')";
      this.result['background-size'] = (imgContainer.clientWidth * cx) + "px " + (imgContainer.clientHeight * cy) + "px";

      this.zoomingEventEmitter.emit(this.result);
  }
  public moveLens(event: any, zoom_lens: HTMLDivElement, imgContainer: HTMLDivElement) {
    let pos, x, y;

    event.preventDefault();
    pos = getCursorPos(event, imgContainer);
    x = pos.x - (zoom_lens.offsetWidth / 2);
    y = pos.y - (zoom_lens.offsetHeight / 2);
    if (x > imgContainer.clientWidth - zoom_lens.offsetWidth) {
      x = imgContainer.clientWidth - zoom_lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > imgContainer.clientHeight - zoom_lens.offsetHeight) {
      y = imgContainer.clientHeight - zoom_lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }
    zoom_lens.style.setProperty('left', x + "px");
    zoom_lens.style.setProperty('top', y + "px");

    const cx = this.heightRender / zoom_lens.offsetWidth;
    const cy = this.heightRender / zoom_lens.offsetHeight;

    this.result["background-position"] = `${(-x * cx)}px ${(-y * cy)}px`
    this.zoomingEventEmitter.emit(this.result);
  }
  public scrollBarEvent(scrollBar: HTMLElement){
    const offsetX = scrollBar.scrollLeft;
    for(let i=0; i< this.itemList.length; i++){
      if(offsetX >= i * this.imgWidth) this.getNewPosition(i);
    }
  }
}
