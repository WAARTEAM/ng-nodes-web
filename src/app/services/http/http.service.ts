import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
 headers = {Authorization: localStorage.getItem("id_token")}
 prod = 'http://waar-nodes.herokuapp.com';
  constructor(private http: HttpClient) { }
  get(route, query=""){
  return  this.http.get(this.prod+ route + query,{headers:this.headers})
  }
  post(route, json){
    return  this.http.post(this.prod + route , json,{headers:this.headers})
    }
  patch(route, json){
      return  this.http.patch(this.prod + route , json,{headers:this.headers})
      }
  delete(route){
        return  this.http.delete(this.prod + route ,{headers:this.headers})
        }  
}
