import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertTips} from "../../../../service/alertTips";
import {NAME} from "../../../../environments/environment";

@Component({
  selector: 'fc-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {

  Form: FormGroup | any
  public title: boolean = true;
  public alertErrors = new AlertTips();
  public name = NAME;
  constructor() {
  }

  ngOnInit(): void {
    this.Form = new FormGroup({
      'firstName': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яієїґА-ЯІЄЇҐ\']+'),
        Validators.maxLength(30)]),
      'secondName': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яієїґА-ЯІЄЇҐ\']+'),
        Validators.maxLength(30)]),
      'titleMail': new FormControl(null, [
        Validators.required,
        Validators.maxLength(100)
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]),
      'message': new FormControl(null, []),
    })
  }

  get firstName() {
    return this.Form.get('firstName');
  }
  get secondName() {
    return this.Form.get('secondName');
  }
  get email() {
    return this.Form.get('email');
  }
  get titleMail() {
    return this.Form.get('titleMail');
  }
  get message() {
    return this.Form.get('message');
  }

  contactForm() {

    if (!this.Form.invalid) {

      // this.emailApi.sendEmail(this.Form.getRawValue()).subscribe({
      //   error: error => console.log(error),
      //   next: () => {
      //     console.log('success email')
      //   }
      // })
    }
  }
}
