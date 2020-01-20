import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { HttpService } from './http/http.service';
@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;
  searchVal = "";
  searchValSubject: Subject<String> = new Subject()
  isAuthenticated: Subject<boolean> = new Subject();

  constructor(private http: HttpService, private router: Router) {}
  registerUser(user) {
    return this.http.post("/users", user);

  
  }
  updateUserInfo(user) {
    return this.http.patch("/users", user);

  }

  authenticateUser(user) {
    return this.http.post(
      "/users/authenticate",
      user
    );
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("username", user["username"]);
    this.authToken = token;
    this.user = user;
  }
  isLoggedIn() {
    return !!localStorage.getItem("id_token");
  }
  logout() {
    localStorage.clear();
    this.router.navigate([""]);
    this.isAuthenticated.next(false);
  }
  getToken() {
    return localStorage.getItem("id_token");
  }
  getUsername() {
    return localStorage.getItem("username");
  }
}
