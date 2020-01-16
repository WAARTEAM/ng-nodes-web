import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ValidateService {
  constructor() {}
  validateRegister(user) {
    console.log(user);
    return (
      user.username ||
      user.email ||
      user.pasword ||
      user.firsName ||
      user.lastName
    );
  }
  validateEmail(email) {
    const emailChackingRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailChackingRe.test(email);
  }
}
