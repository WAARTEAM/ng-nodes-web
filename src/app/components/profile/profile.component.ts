import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { HttpService } from "src/app/services/http/http.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  profile: boolean;
  status: String = "";
  $user: Observable<any>;
  constructor(
    public http: HttpService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}
  id: any;

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(param => {
      this.profile = !param.username;
      if (this.profile)
        this.$user = this.http
          .get(`/users/${this.authService.getUsername()}`)
          .pipe(map(one => one["user"]));
      else {
        this.$user = this.http
          .get(`/users/${param.username}`)
          .pipe(map(one => one["user"]));
      }
      this.$user.subscribe(user => {
        this.id = user._id;
        console.log(user);
        if (user.areFriends) this.status = "Remove friend";
        else if (user.sentRequest) this.status = "Remove friend request";
        else if (user.gotrequest) this.status = "Accept friend request";
        else this.status = "Add friend";
      });
    });
  }

  handleFriendRequests() {
    if (this.status === "Remove friend request") {
      this.http.get(`/users/${this.id}/removerequest`).subscribe(data => {
        if (data["success"]) this.status = "Add friend";
      });
    } else if (this.status === "Add friend") {
      this.http.get(`/users/${this.id}/sendrequest`).subscribe(data => {
        if (data["success"]) this.status = "Remove friend request";
      });
    } else if (this.status === "Remove friend") {
      this.http.get(`/users/${this.id}/removefriend`).subscribe(data => {
        if (data["success"]) this.status = "Add friend";
      });
    } else if (this.status === "Accept friend request") {
      this.http.get(`/users/${this.id}/acceptrequest`).subscribe(data => {
        if (data["success"]) this.status = "Remove friend";
      });
    }
  }
}
