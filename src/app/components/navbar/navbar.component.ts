import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService) {}
  
  ngOnInit() {
  this.authService.isAuthenticated.subscribe(bool=>{
    console.log(bool)
    this.isAuthenticated = bool;
  })
  }
  isAuthenticated: boolean= false;
  
}
