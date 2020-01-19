import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  token = localStorage.getItem("id_token");
  headers = { Authorization: this.token };
  prod = "http://waar-nodes.herokuapp.com/api";
  dev = "http://127.0.0.1:7000/api";
  constructor(private http: HttpClient) {}
  initialsGenerator(name, size = 250) {
    return `https://ui-avatars.com/api/?size=${size}&name=${name}&background=0fabcd&color=fff`;
  }
  get(route, query = "") {
    console.log(this.token);
    return this.http.get(this.prod + route + query, {
      headers: this.token ? this.headers : null
    });
  }
  post(route, json) {
    return this.http.post(this.prod + route, json, {
      headers: this.token ? this.headers : null
    });
  }
  patch(route, json) {
    return this.http.patch(this.prod + route, json, {
      headers: this.token ? this.headers : null
    });
  }
  delete(route) {
    return this.http.delete(this.prod + route, {
      headers: this.token ? this.headers : null
    });
  }
}
