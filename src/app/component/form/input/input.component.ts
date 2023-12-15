import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fc-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() {}

  @Input() inputElement!: HTMLInputElement | HTMLTextAreaElement;
  public toggleFocus: boolean = false;
  @Input() label: string | undefined;
  @Input() type: any;
  @Input() value: string = '';
  @Input() notNull: boolean = false;
  ngOnInit(): void {

  }
  ngAfterViewInit(){
    this.inputElement.addEventListener('focus', this.onFocus.bind(this));
    this.inputElement.addEventListener('blur', this.onBlur.bind(this));
    if (this.value !='') this.inputElement.value = this.value;
  }
  onFocus(){
    this.toggleFocus = true;
  }
  onBlur(){
    this.toggleFocus = false
  }
  ngOnChanges(){
    if (this.value !='') this.inputElement.value = this.value;
  }
}
