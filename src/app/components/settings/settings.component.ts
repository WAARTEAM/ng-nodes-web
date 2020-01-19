import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  $user:Observable<any>;
  constructor(private http : HttpService, private authService : AuthService) { }

  ngOnInit() {
    this.$user = this.http
          .get(`/users/${this.authService.getUsername()}`)
          .pipe(map(one => one["user"]));
  }

}
