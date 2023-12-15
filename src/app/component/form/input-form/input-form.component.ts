import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'fc-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  constructor() {}

  @Input() inputElement!: HTMLInputElement;
  public toggleFocus: boolean = false;
  @Input() formControlVariable: FormControl | any;
  @Input() errorMessage: any | undefined;
  @Input() label: string | undefined;
  @Input() type: any;
  @Input() value: string = '';
  public readonly :boolean =  false;

  ngOnInit(): void {
    this.readonly = this.inputElement.hasAttribute('readonly');
    this.type = this.type == undefined ? this.inputElement.getAttribute('type') || 'text' : 'text';
    this.inputElement.addEventListener('focus', this.onFocus.bind(this));
    this.inputElement.addEventListener('blur', this.onBlur.bind(this));
    this.inputElement.addEventListener('keydown', this.handleInputEvent.bind(this));
    this.inputElement.addEventListener('paste', this.handleInputEvent.bind(this));
    if (this.value !='') this.inputElement.value = this.value;
  }
  ngAfterViewInit(){

  }
  handleInputEvent(event: KeyboardEvent | ClipboardEvent) {
    if (this.readonly) {
      event.preventDefault();
      return false;
    }
    return true;
  }
  onFocus(){
    this.toggleFocus = true;
  }
  onBlur(){
    this.toggleFocus = false
  }
}
