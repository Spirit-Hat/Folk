import {FormControl} from "@angular/forms";

export class AlertTips {

  login(login: FormControl){
    return login.errors?.['required'] ?
      'Потрібно заповнити' : login.errors?.['pattern'] ?
        'Ви можете використовувати тільки англійські літери' : login.errors?.['maxlength'] ?
          `Ви перевищили максимальну кількість символів` : '';
  }
  name(name: FormControl) {
    return name.errors?.['required'] ?
      'Потрібно заповнити' : name.errors?.['pattern'] ?
        'Ви можете використовувати тільки літери алфавіта' : name.errors?.['maxlength'] ?
          `Ви перевищили максимальну кількість символів` : '';
  }

  password(password: FormControl) {
    return password.errors?.['required'] ? 'Потрібно заповнити' :
      password.errors?.['pattern'] ? 'Ви не можете використовувати розділяючі символи ' :
        password.errors?.['minlength'] ? `Мінімальна кількість символів для пароля 10` :
          password.errors?.['confirmedValidator'] ? 'Паролі не збігаються' :
            password.errors?.['maxlength'] ? `Ви перевищили максимальну кількість символів` : '';

  }

  email(email: FormControl) {
    return email.errors?.['required'] ?
      'Потрібно заповнити' : email.errors?.['email'] ?
        'Не коректно ведена пошта' : email.errors?.['maxlength'] ?
          `Ви перевищили максимальну кількість символів` : '';
  }

  phone(phone: FormControl) {
    return phone.errors?.['required'] ?
      'Потрібно заповнити' : phone.errors?.['pattern'] ?
        'Не коректно веден телефон' : '';
  }

  required(formControl: FormControl) {
    return formControl.errors?.['required'] ? 'Потрібно заповнити' : '';
  }

  commonTip(formControlAmount: FormControl) {
    return formControlAmount.errors?.['required'] ?
      'Потрібно заповнити' : formControlAmount.errors?.['pattern'] ?
        'Не коректний ввід' :  formControlAmount.errors?.['maxlength'] ?
          `Ви перевищили максимальну кількість символів` : '';
  }
}
