import { Component,OnInit } from "@angular/core";
import { AuthService } from './services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor(private authService:AuthService,private activatedRoute : ActivatedRoute){

  }
  title = "ng-nodes-web";
  ngOnInit(): void {
   console.log(this.activatedRoute)
   setTimeout(()=>this.authService.isAuthenticated.next(!!this.authService.getToken()) ,0) 
  }
}
