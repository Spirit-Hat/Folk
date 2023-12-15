import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {SVG} from "../../../../environments/environment";

const MAX_IMG_COUNT: number = 10;

@Component({
  selector: 'fc-upload-product-img',
  templateUrl: './upload-product-img.component.html',
  styleUrls: ['./upload-product-img.component.scss']
})
export class UploadProductImgComponent implements OnInit {
  dragUploadingImg: boolean = false;
  @Input() fileList: string[] = new Array<string>(MAX_IMG_COUNT);
  selectIndex: number = 0;
  selectImg!: string;
  @Output() fileImgEmitter = new EventEmitter<string[]>();

  constructor(
  ) {
  }

  ngOnInit(): void {
  }
  svg = SVG;

  startDragImg(index: number){
    this.selectIndex = index;
    this.dragUploadingImg =true;
  }

  swapImg(event: DragEvent, img: string){
    event.preventDefault();
    this.fileList[this.selectIndex] = img;
    this.fileEventEmitter()
  }

  public dropFileList(event: DragEvent, drop:HTMLElement) {
    event.preventDefault()
    drop.classList.remove('dragover')
    if(this.dragUploadingImg){
      const buffer = this.fileList[this.selectIndex]
      this.fileList[this.selectIndex] = this.fileList[0];
      this.fileList[0] = buffer;
      this.fileEventEmitter()
      return
    }
    if (event.dataTransfer) {
      const files = event.dataTransfer.files;
      for (let i = 0; i < files.length && i < MAX_IMG_COUNT; i++) {
        this.getFile(files[i], i);
      }
      this.fileEventEmitter()
    }
  }

  private fileEventEmitter(){
    const filterList = this.fileList.filter(function( element ) {
      return element !== undefined;
    })
    this.fileImgEmitter.emit(filterList);
  }
  public uploadFileList(event: any, inputImg: HTMLInputElement) {
    event.preventDefault()
    if (inputImg.files) {
      const files = inputImg.files
      for (let i = 0; i < files.length && i < MAX_IMG_COUNT; i++) {
        this.getFile(files[i], i);
      }
      this.fileEventEmitter()
    }

  }

  public uploadFile(event: any, inputImg: HTMLInputElement): void {
    event.preventDefault()
    let file: any;
    if(inputImg.files){
      file= inputImg.files[0]
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          this.fileList[this.selectIndex] = reader.result;
        }
      };
     this.fileEventEmitter()
    }
    return
  }

  public dropFile(event: DragEvent, i=0, image: string):void {
    event.preventDefault()
    if(this.dragUploadingImg){
      this.fileList[this.selectIndex] = image;
    }
    this.selectIndex = i;
    if (event.dataTransfer) {
      const file = event.dataTransfer.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === "string") {
          this.fileList[this.selectIndex] = reader.result;
        }
      };
      this.fileEventEmitter()
    }
  }

  private getFile(file: File, index: number) {
    if (file.type.match('image.*')) {

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === "string") {
            this.fileList[index] = reader.result;
          }
        };

    } else {
    }
  }
  deleteImg(id: number){
    this.fileList = this.fileList.filter((element, index) => index !== id);
    this.fileEventEmitter();
  }
  extendedFiles(){
    return this.fileList.concat(Array(MAX_IMG_COUNT-this.fileList.length).fill(undefined));
  }
  @HostListener('window:drag', ['$event'])
  private WindowDrop(event: DragEvent) {
    event.preventDefault();
  }

  @HostListener('window:dragover', ['$event'])
  private WindowDragover(event: DragEvent) {
    event.preventDefault();
  }

}
