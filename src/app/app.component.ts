import { Component,OnInit } from "@angular/core";
import { AuthService } from './services/auth.service';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  constructor(private authService:AuthService){

  }
  title = "ng-nodes-web";
  ngOnInit(): void {
    // console.log(!!this.authService.getToken(),this.authService.getToken())
   setTimeout(()=>this.authService.isAuthenticated.next(!!this.authService.getToken()) ,0) 
  }
}
