import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profile:boolean;
  status : String= "";
  $user:Observable<any>;
  constructor(private http : HttpService, private activatedRoute:ActivatedRoute, private authService : AuthService) { }

  ngOnInit() {
    
    this.activatedRoute.params.subscribe(param => {
      this.profile = !param.username
      if(this.profile) this.$user = this.http.get(`/api/users/${this.authService.getUsername()}`).pipe(map(one => one['user']))
      else{
        this.$user = this.http.get(`/api/users/${param.username}`).pipe(map(one => one['user']))
      }
      this.$user.subscribe(user => {
        console.log(user)
        if(user.areFriends) this.status = "Remove friend"
        else if (user.sentRequest) this.status = "Remove friend request"
        else if (user.gotrequest) this.status = "Accept friend request"
        else this.status = "Add friend"
      })
    })
  }

}
