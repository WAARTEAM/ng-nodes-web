import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import { Observable } from 'rxjs';
// import 'rxjs/add/operator/scan';
// import * as Rx from 'rxjs/Rx'; 
// import { Observable, Subject ,asapScheduler, pipe, of, from, interval, merge, fromEvent, Subscriber } from 'rxjs';


// import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';


@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
 // socket that connect to socket io server 
   socket: any;

   uri = "http://127.0.0.1:7000" ; // the url of socket server


  constructor() {
    this.socket = io(this.uri)
   }

  //  // Listen on an event and return the data from it 

   
  listen(eventName:String){
   return new Observable((subscriber)=>{
     this.socket.on(eventName, (data)=>{
      subscriber.next(data);
     })
   })
  }
  emit(eventName: string, data:any){
    this.socket.emit(eventName, data)
  }   
}
