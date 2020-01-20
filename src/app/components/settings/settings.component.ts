import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ValidateService } from 'src/app/services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  $user:Observable<any>;

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
    this.authService.updateUserInfo(user).subscribe(data=> {
      if(data["success"]){
        this.flashMessage.show("Info Updated Successfully", {
          cssClass: "alert-success",
          timeout: 3000
        });
        this.router.navigate(["profile"]);
      }else{
        this.flashMessage.show(data["msg"], {
          cssClass: "alert-danger",
          timeout: 3000
        }); 
      }
    });
  }

  constructor(private http : HttpService, private authService : AuthService,    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,private router : Router) { }

  ngOnInit() {
    this.$user = this.http
          .get(`/users/${this.authService.getUsername()}`)
          .pipe(map(one => one["user"]));
  }

}
