import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  onLogin(form: NgForm) {
    const user = form.value;
    const username = form.value.username;
    const password = form.value.password;

    this.authService.authenticateUser(user).subscribe(data => {
      if (data["success"]) {
        console.log(data);
        this.authService.storeUserData(data["token"], data["username"]);
        this.flashMessage.show("you're logged in", {
          cssClass: "alert-success",
          timeout: 5000
        });
        this.router.navigate(["/"]);
      } else {
        this.flashMessage.show(data["msg"], {
          cssClass: "alert-danger",
          timeout: 5000
        });
        this.router.navigate(["login"]);
      }
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {}
}
