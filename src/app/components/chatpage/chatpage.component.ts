import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { WebsocketService } from '../../services/Websocket/Websocket.service'
 

@Component({
  selector: "app-chatpage",
  templateUrl: "./chatpage.component.html",
  styleUrls: ["./chatpage.component.scss"]
})
export class ChatpageComponent implements OnInit {
  constructor(public http: HttpService, private websocket :WebsocketService) {}
  currentReceiver: any;
  currentUser: any;
  currentRoom: any;
  render: String = "friends";
  messages: any;
  latest: any;
  latestChatrooms: any;
  chatrooms: any;

  ngOnInit() {
    this.currentUser = localStorage.getItem("username");
    this.http.get(`/messages/latest`).subscribe(data => {
      console.log(data)
      this.latest = data;
      this.currentReceiver =
        this.latest[0].sender.username === this.currentUser
          ? this.latest[0].receiver._id
          : this.latest[0].sender._id;
          // how to use socket service 
          // getting data from the server 
          //this.websocket.listen("message").subscribe((data)=>{
          //   console.log(data)
          // })

           // how to use socket service 
          // posting data from the server 
          //this.websocket.emit("message",data)
          // })
     
    });
  }
  content: String;

  sendMessage() {
    this.http
      .post(`/users/${this.currentReceiver}/messages`, {
        content: this.content
      })
      .subscribe(data => {
        //logic of adding the message as a template to the chat
        this.messages.push(data);
      });
  }

}
