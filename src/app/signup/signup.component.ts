import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ValidateService } from "./../services/validate.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { AuthService } from "./../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  formSubmitted(form: NgForm) {
    const user = form.value;
    const email = form.value.email;
    // required fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("please fill in all fields", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    // Validate email
    if (!this.validateService.validateEmail(email)) {
      this.flashMessage.show("please use a valid email", {
        cssClass: "alert-danger",
        timeout: 3000
      });
      return false;
    }
    // Register user
    this.authService.registerUser(user).subscribe(data => {
      console.log(JSON.parse(data["_body"]));
      // if (data["_body"].json()) {
      // this.flashMessage.show("you are now registered and can log in", {
      //   cssClass: "alert-success",
      //   timeout: 3000
      // });
      //   this.router.navigate(["/login"]);
      // } else {
      //   this.flashMessage.show("Something went wrong", {
      //     cssClass: "alert-danger",
      //     timeout: 3000
      //   });
      //   this.router.navigate(["/register"]);
      // }
    });
  }
  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {}
}
