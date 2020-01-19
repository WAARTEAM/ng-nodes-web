import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;
  isAuthenticated: Subject<boolean> = new Subject();

  constructor(private http: HttpClient, private router: Router) {}
  registerUser(user) {
    return this.http.post("http://localhost:7000/api/users", user);
    // .subscribe(data => console.log(data));
    // .pipe(map((response: any) => response.json()))
  }
  authenticateUser(user) {
    return this.http.post(
      "http://localhost:7000/api/users/authenticate",
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
    console.log("hello");
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
