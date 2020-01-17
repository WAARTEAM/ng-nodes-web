import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user :any ;
  constructor(private http: HttpClient) {}
  registerUser(user) {

    return this.http.post("http://waar-nodes.herokuapp.com/api/users", user);
    // .subscribe(data => console.log(data));
    // .pipe(map((response: any) => response.json()))
  }
  authenticateUser(user) {
    return this.http.post(
      "http://waar-nodes.herokuapp.com/api/users/authenticate",
      user
    );
  }

  storeUserData(token, user) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("username", user['username']);
    this.authToken = token;
    this.user = user;
  }

  isLoggedIn(){
    return !!localStorage.getItem("id_token");
  }
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  loadToken (){
    this.authToken = localStorage.getItem("id_token")
  }
  getUsername (){
    return localStorage.getItem("username")
  }


  

}