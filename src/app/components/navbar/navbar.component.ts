import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService) {}
  
  logOut(){
    this.authService.logout()
  }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(bool=>{
      this.isAuthenticated = bool;
    })
  }
  isAuthenticated: boolean= false;
  
}
