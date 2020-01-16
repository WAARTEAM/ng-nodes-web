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

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

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
    this.authService.registerUser(user).subscribe(data=> {
      console.log(data)
      if(data["success"]){
        this.flashMessage.show("Signed Up Successfully", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["login"]);
      }else{
        this.flashMessage.show(data["msg"], {
          cssClass: "alert-danger",
          timeout: 3000
        }); 
        this.router.navigate(["register"]);
      }
      //this needs to be fixed, it need to check the status of the body if it's true or false, and respond to the user respectively


      // if (data["_body"].json()){
      // this.flashMessage.show("you are now registered and can log in", {
      //   cssClass: "alert-success",
      //   timeout: 3000
      // });
      //   this.router.navigate(["/login"]);
      // } else {
      // }
    });
  }
  

  ngOnInit() {}
}
