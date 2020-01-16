import { Injectable } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: Http) {}

  registerUser(user) {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    return this.http.post("http://waar-nodes.herokuapp.com/api/users", user, {
      headers: headers
    });
    // .subscribe(data => console.log(data));
    // .pipe(map((response: any) => response.json()))
  }
}
