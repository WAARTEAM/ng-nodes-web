import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";

@Component({
  selector: "app-chatpage",
  templateUrl: "./chatpage.component.html",
  styleUrls: ["./chatpage.component.scss"]
})
export class ChatpageComponent implements OnInit {
  constructor(private http: HttpService) {}
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
      console.log(data);
      this.latest = data;
      this.currentReceiver =
        this.latest[0].sender.username === this.currentUser
          ? this.latest[0].receiver._id
          : this.latest[0].sender._id;
      this.getMessages();
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
        console.log(this.messages);
      });
  }

  changeCurrent(message) {
    this.currentReceiver = this.receiverId(message);
    this.getMessages();
  }
  getChatroom() {
    this.http.get(`/groups/${this.currentRoom}`).subscribe(chatroom => {
      console.log(chatroom);
    });
  }

  currentChatroom(chatroom) {
    this.currentRoom = chatroom._id;
  }

  getMessages() {
    this.http
      .get(`/users/${this.currentReceiver}/messages`)
      .subscribe(messages => {
        this.messages = messages;
      });
  }
  receiverId(message) {
    return message.sender.username === this.currentUser
      ? message.receiver._id
      : message.sender._id;
  }

  getChatrooms() {
    this.http.get("/groups").subscribe(data => {
      this.latestChatrooms = data;
      this.currentRoom = this.latestChatrooms[0]._id;
      this.getChatroom();
      this.changeRender("chatrooms");
    });
  }
  changeRender(str) {
    this.render = str;
  }
  ngOnDestroy(): void {
    this.latest = null;
  }
}
