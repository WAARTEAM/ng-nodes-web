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
    private http: HttpService,
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
        if (user.areFriends) this.status = "Remove friend";
        else if (user.sentRequest) this.status = "Remove friend request";
        else if (user.gotRequest) this.status = "Accept friend request";
        else this.status = "Add friend";
      });
    });
    this.$user.subscribe(data => {
      this.id = data._id;
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
    }
  }
}
