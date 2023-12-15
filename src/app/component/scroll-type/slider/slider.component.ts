import {Component, HostListener, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {SVG} from "../../../../environments/environment";

export interface Slide {
  src: string;
  title: string;
  url_path: string;
  src_trailer?: string;
  start_preview?: string;
  detail?: string
}

@Component({
  selector: 'fc-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],

})
export class SliderComponent implements OnInit {

  public svg=SVG;
  public inner_width = window.innerWidth
  public window = window;

  @Input() direction: string = 'horizontal';
  @Input() currentSlide: number = 0;
  @Input() sliderClass: string = 'banner';
  @Input() header_slider: Slide[] = [
    {
      src: "./assets/test/test_slider/preview.png",
      title: "Madison",
      url_path: 'madison',
      src_trailer: './assets/video/madison/madison.mp4',
      start_preview: "Ласкаво просимо в Folk Craft!",
      detail: "LLL",
    },
    {
      src: "./assets/test/test_slider/Slide2.jpeg",
      title: "Slide2",
      url_path: 's',
      src_trailer: './assets/video/slide/',
    },
    {
      src: "./assets/test/test_slider/slide3.png",
      title: "slide3",
      url_path: 's',
      src_trailer: './slide',
    }
  ];

  @ViewChild('slider_contain') slider_component: ElementRef | undefined;
  @ViewChild('trigger_contain') trigger_component: ElementRef | undefined;

  private PicturePosition: number[] = [];
  private Pictures: HTMLElement[] = []
  private startPosition: number = 0;
  private endPosition: number = 0;
  private delay: number = 10 * 1000;
  subscription: Subscription | undefined;

  public nextSlidePicture: Slide = this.header_slider[this.nextSlideLogic()]
  public prevSlidePicture: Slide = this.header_slider[this.prevSlideLogic()]

  constructor() {
  }

  ngOnInit(): void {
    this.UpdateTimer()
  }

  reloadTimer() {
    this.unSubscribe();
    this.UpdateTimer();
  }

  unSubscribe() {
    // @ts-ignore
    this.subscription.unsubscribe();
  }

  UpdateTimer() {
    const source = interval(this.delay);
    this.subscription = source.subscribe(() => this.onNextClick());
  }

  prevSlideLogic() {
    const previous = this.currentSlide - 1;
    return previous < 0 ? this.header_slider.length - 1 : previous;
  }

  nextSlideLogic() {
    const next = this.currentSlide + 1;
    return next === this.header_slider.length ? 0 : next;
  }

  GetPrevAndNextSlider() {
    this.prevSlidePicture = this.header_slider[this.prevSlideLogic()]
    this.nextSlidePicture = this.header_slider[this.nextSlideLogic()]
  }

  onPreviousClick() {
    this.reloadTimer()
    this.currentSlide = this.prevSlideLogic()
    this.GetPrevAndNextSlider()
  }

  onNextClick() {
    this.reloadTimer()
    this.currentSlide = this.nextSlideLogic();
    this.GetPrevAndNextSlider();
  }

  GiveSlide(index: number) {
    this.reloadTimer()
    this.currentSlide = index;
  }

  private getClientPosition(event: any, slider: HTMLElement, endPosition: boolean = false): number {
    const position: number = event.x ?
      this.direction == 'horizontal' ? event.x : event.y :
      this.direction == 'horizontal' ?
        !endPosition ? event.touches[0].clientX : event.changedTouches[0].clientX :
        !endPosition ? event.touches[0].clientY : event.changedTouches[0].clientY;
    const rect = slider.getBoundingClientRect();
    return this.direction == 'horizontal' ?
      Math.min(Math.max(0, position - rect.x), rect.width) / rect.width :
      Math.min(Math.max(0, position - rect.y), rect.height) / rect.height
  }

  public getPosition(index: number, slide: HTMLElement): string {
    const rect = slide.getBoundingClientRect()
    if (index < this.currentSlide) {
      return this.direction == 'horizontal' ?
        -Math.abs(index - this.currentSlide) * rect.width + 'px' :
        -Math.abs(index - this.currentSlide) * rect.height + 'px'
    } else if (index > this.currentSlide) {
      return this.direction == 'horizontal' ?
        Math.abs(index - this.currentSlide) * rect.width + 'px' :
        Math.abs(index - this.currentSlide) * rect.height + 'px'
    } else return '0px'
  }

  public UpdatePosition(slide: HTMLElement) {
    this.Pictures.forEach((elem: HTMLElement, index) => {
      if (this.direction == 'horizontal') {
        elem.setAttribute('style', `left: ${this.getPosition(index, slide)}`)
      } else {
        elem.setAttribute('style', `top: ${this.getPosition(index, slide)}`)
      }
      this.PicturePosition[index] = parseFloat(this.getPosition(index, slide))
    })
  }

  sliderControlStart(event: any, slider: HTMLElement) {
    slider.classList.add('by-moved')
    this.UpdatePosition(slider)
    this.unSubscribe()
    this.startPosition = this.getClientPosition(event, slider);
  }

  sliderControl(event: any, slider: HTMLElement) {
    event.preventDefault()
    const position = event.x ?
      this.direction == 'horizontal' ? event.x : event.y :
      this.direction == 'horizontal' ? event.touches[0].clientX : event.touches[0].clientY;
    const rect = slider.getBoundingClientRect();
    slider.classList.add('hover')

    if (event.which === 1 || event.type === 'touchmove') {
      this.Pictures.forEach((elem: HTMLElement, index) => {
        if (this.direction == 'horizontal') {
          elem.setAttribute('style', `left: ${position - rect.x - this.startPosition * rect.width + this.PicturePosition[index]}px`)
        } else {
          elem.setAttribute('style', `top: ${position - rect.y - this.startPosition * rect.height + this.PicturePosition[index]}px`)
        }
      })
    }
    setTimeout(() => slider.classList.remove('hover'), 5000)
  }

  sliderControlEnd(event: any, slider: HTMLElement) {
    slider.classList.remove('by-moved')
    this.UpdateTimer()
    this.endPosition = this.getClientPosition(event, slider, true);
    if (Math.abs(this.startPosition - this.endPosition) >= 0.2) {
      if (this.startPosition < this.endPosition) {
        this.onPreviousClick()
      } else {
        this.onNextClick()
      }
    }
    setTimeout(() => this.UpdatePosition(slider), 1);
  }


  @HostListener('window:resize', ['$event'])
  onResize() {
    this.inner_width = window.innerWidth
    this.slider_component?.nativeElement.classList.add('by-moved')
    setTimeout(() => this.slider_component?.nativeElement.classList.remove('by-moved'), 30);
  }


  @HostListener('document:keydown', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (this.direction == 'horizontal') {
      switch (String(event.key).toLowerCase()) {
        case "arrowleft": // prev
        case "j":
        case "о":
        case "a":
        case "ф":
          this.onPreviousClick();
          break;

        case "arrowright": // next
        case "l":
        case "д":
        case "d":
        case "в":
          this.onNextClick();
          break;

        default :
          break;
      }
    } else {
      switch (event.key.toLowerCase()) {
        case "arrowup": // prev
        case "i":
        case "ш":
        case "ц":
        case "w":
          this.onPreviousClick();
          break;

        case "arrowdown": // next
        case "m":
        case "ь":
        case "ы":
        case "s":
          this.onNextClick();
          break;

        default :
          break;
      }
    }
  }

  ngAfterViewInit() {
    this.Pictures = Array.from(document.getElementsByClassName('header-banner')) as HTMLElement[]
  }

  ngOnDestroy() {
    // @ts-ignore
    this.subscription.unsubscribe();
  }

  timeOffset(progressCircle: HTMLElement) {
    // @ts-ignore
    return Math.PI * progressCircle.getAttribute('r') / 2
  }
}
