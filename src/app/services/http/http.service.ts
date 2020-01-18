import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class HttpService {
  headers = { Authorization: localStorage.getItem("id_token") };
  prod = "http://waar-nodes.herokuapp.com/api";
  dev  = "http://127.0.0.1:7000/api"
  constructor(private http: HttpClient) {}
  get(route, query = "") {
    return this.http.get(this.dev + route + query, { headers: this.headers });
  }
  post(route, json) {
    return this.http.post(this.dev + route, json, { headers: this.headers });
  }
  patch(route, json) {
    return this.http.patch(this.dev + route, json, { headers: this.headers });
  }
  delete(route) {
    return this.http.delete(this.dev + route, { headers: this.headers });
  }
}
