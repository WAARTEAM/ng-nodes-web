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
  friends:Array<any>;
  isRequest:boolean;

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

  sendMessage(value){
    this.http
      .post(`/users/${this.id}/messages`, {
        content: value
      }).subscribe(data => {
       }); 
  }


  getAllFreinds(){
    this.friends = null;
      this.isRequest = false;
    this.http
      .get(`/friends`).subscribe((data:Array<Object>) => {
         //logic of adding the message as a template to the chat
         this.friends = data;
       }); 
  }
  
  getAllRequests(){
    this.friends = null;
    this.isRequest = true;
    this.http
      .get(`/requests`).subscribe((data:Array<Object>) => {
         //logic of adding the message as a template to the cha
        //  console.log(data)
        this.friends = data.map(one => one["sender"]);
       }); 
  }

  acceptFriendRequest(id){
    this.http.get(`/users/${id}/acceptrequest`).subscribe( (data:Array<Object>) => {
      if (data["success"]){
       this.friends = this.friends.filter( item => item["_id"] !== id);

       console.log(this.friends);
      } 
   });
  }

}

// this.friends.filter( item => item["_id"].toString() !== id.toString );

 