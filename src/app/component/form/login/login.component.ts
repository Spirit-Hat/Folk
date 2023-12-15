import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AlertTips} from "../../../../service/alertTips";
import {PopupService} from "../../../../service/popup.service";
import {RegistrationComponent} from "../registration/registration.component";
import {NAME, SVG} from "../../../../environments/environment";
import {AuthService} from "../../../../service/api/AuthService";

@Component({
  selector: 'fc-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Form: FormGroup | any
  name = NAME;
  svg = SVG;
  @Input() title: boolean = true;
  @Input() height: number = 0;

  public loginBtnStatus: boolean = false;
  public alertErrors = new AlertTips();

  constructor(private popupService: PopupService,
              private authAPIService:AuthService,
  ){
  }

  ngOnInit(): void {
    this.Form = new FormGroup({
      'login': new FormControl(null, [
        Validators.maxLength(50),

      ]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[\\S]+'),
        Validators.maxLength(30),
      ]),
    },{
      // validators:  this.loginValidator()
    })
  }

  get login() {return this.Form.get('login');}
  get password() {return this.Form.get('password');}


  alertLoginErrors(formControlLogin: FormControl) {
    return formControlLogin.errors?.['required'] ? 'Потрібно заповнити' :
      formControlLogin.errors?.['maxlength'] ? 'Ви перевищили максимальну кількість символів' :
        this.login.errors?.['emailInvalid'] ? 'Неправильно введена пошта' :
          this.login.errors?.['phoneInvalid'] ? 'Неправильно введен номер телефона' : '';
  }

  loginValidator(): ValidatorFn  {
    // @ts-ignore
    return (group: FormGroup): ValidationErrors | null => {
      const loginName = group.controls['login'];
      const regexEmail = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')
      const containEmail = new RegExp('\\b@\\b')
      const regexPhone = new RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$')
      if(containEmail.test(loginName.value)){
        if(!regexEmail.test(loginName.value)) loginName.setErrors({emailInvalid: true});
        return null;
      } else{
        if(!regexPhone.test(loginName.value)) loginName.setErrors({phoneInvalid: true});
        return null;
      }
    }
  }

  loginForm() {
    if(!this.Form.invalid){
      this.authAPIService.login(this.login.value, this.password.value);
    }
  }

  openRegistrationPopup(){
    this.popupService.open(this.name.registration, RegistrationComponent, {height: 65})
  }
  isDisabled(form: FormControl): boolean {
    if (this.loginBtnStatus) return form.invalid;
    return !this.login.dirty || !this.password.dirty
  }
}
