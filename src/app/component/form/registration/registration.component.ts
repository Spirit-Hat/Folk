import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AlertTips} from "../../../../service/alertTips";
import {PopupService} from "../../../../service/popup.service";
import {NAME, SVG} from "../../../../environments/environment";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../../../../service/api/AuthService";
import {Register} from "../../../../service/authorization/register";

@Component({
  selector: 'fc-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  Form: FormGroup | any

  @Input() title: boolean = true;
  @Input() height: number = 0;

  public svg = SVG;
  public alertErrors = new AlertTips();
  public name = NAME;

  constructor(private popup: PopupService,
              private authAPIService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.Form = new FormGroup({
      'firstName': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яієїґА-ЯІЄЇҐ\']+'),
        Validators.maxLength(30)]),
      'lastName': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Zа-яієїґА-ЯІЄЇҐ\']+'),
        Validators.maxLength(30)]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[\\S]+'),
        Validators.minLength(10),
        Validators.maxLength(30),
      ]),
      'confirmPassword': new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern('^[\\S]+'),
          Validators.minLength(10),
          Validators.maxLength(30),
        ]
      }),
      'login': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-Z_]+'),
        Validators.maxLength(30),
      ]),
      'email': new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ]),
      'phone': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$'),
      ]),
    }, {
      validators: this.confirmedValidator('password', 'confirmPassword')
    })
  }

  private confirmedValidator(controlName: string, matchingControlName: string): ValidatorFn {
    // @ts-ignore
    return (group: FormGroup): ValidationErrors | null => {
      const control = group.controls[controlName];
      const matchingControl = group.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) return null;
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({confirmedValidator: true})
      } else {
        matchingControl.setErrors(null)
      }
    };
  }

  get login() {
    return this.Form.get('login');
  }

  get firstName() {
    return this.Form.get('firstName');
  }

  get lastName() {
    return this.Form.get('lastName');
  }

  get confirmPassword() {
    return this.Form.get('confirmPassword');
  }

  get password() {
    return this.Form.get('password');
  }

  get email() {
    return this.Form.get('email');
  }

  get phone() {
    return this.Form.get('phone');
  }

  Registration() {
    if (!this.Form.invalid) {
      let formdata = this.Form.getRawValue();
      delete formdata.confirmPassword;
      this.authAPIService.registration(formdata)

    }
  }

  goToLogin() {
    this.popup.open(this.name.login, LoginComponent, {height: 40})
  }


}
