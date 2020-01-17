import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get("/api/users/Admin202").subscribe(data =>console.log(data))
  }

}
