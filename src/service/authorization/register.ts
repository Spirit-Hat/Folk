export class Register {
  
  login: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;


  constructor(login: string, firstName: string, lastName: string, email: string, password: string, phone: string) {
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.phone = phone;
  }
}
