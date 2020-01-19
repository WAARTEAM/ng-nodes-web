import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http/http.service';

import { Subject, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-search-area',
  templateUrl: './search-area.component.html',
  styleUrls: ['./search-area.component.scss']
})
export class SearchAreaComponent implements OnInit {

  constructor(private authService : AuthService, public http : HttpService) { }
  searchValSubject:Subscription;
  $users:Observable<any>;
  getUsers(keyword){
    if(keyword)
    this.$users = this.http.get("/users/search" , `?keyword=${keyword}`)
  } 
  ngOnInit() {
    this.searchValSubject =  this.authService.searchValSubject.subscribe(one =>{
      this.getUsers(one)
    })
    this.getUsers(this.authService.searchVal)
  }

  ngOnDestroy(): void {
    this.searchValSubject.unsubscribe()
    
  }

}
