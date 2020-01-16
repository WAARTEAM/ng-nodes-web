import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  authToken: any;
  constructor(private http: HttpClient) {}
  registerUser(user) {
    return this.http.post("http://waar-nodes.herokuapp.com/api/users", user)
    // .subscribe(data => console.log(data));
    // .pipe(map((response: any) => response.json()))
  }
}
