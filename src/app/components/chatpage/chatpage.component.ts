import { Component, OnInit } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";

@Component({
  selector: "app-chatpage",
  templateUrl: "./chatpage.component.html",
  styleUrls: ["./chatpage.component.scss"]
})
export class ChatpageComponent implements OnInit {
  constructor(public http: HttpService) {}
  currentReceiver: any;
  currentUserUsername: any;
  currentUser: any;
  currentRoom: any;
  render: String = "friends";
  messages: any;
  friends: any;
  latest: any;
  latestChatrooms: any;
  chatrooms: any;
  chatroomName: any;
  toggle: boolean;

  ngOnInit() {
    this.currentUserUsername = localStorage.getItem("username");
    this.http.get(`/users/${this.currentUserUsername}`).subscribe(data => {
      this.currentUser = data["user"];
    });
    this.http.get(`/messages/latest`).subscribe((data: any) => {
      console.log(data);
      if (data.length != 0) {
        this.latest = data;
        this.currentReceiver =
          this.latest[0].sender.username === this.currentUserUsername
            ? this.latest[0].receiver._id
            : this.latest[0].sender._id;
        this.getMessages();
      }
    });
  }
  content: String;

  sendMessage() {
    if (this.render === "friends") {
      this.http
        .post(`/users/${this.currentReceiver}/messages`, {
          content: this.content
        })
        .subscribe(data => {
          this.messages.push(data);
        });
    } else if (this.render === "chatrooms") {
      this.http
        .post(`/groups/${this.currentRoom._id}`, {
          content: this.content
        })
        .subscribe(data => {
          this.messages.push(data);
        });
    }
  }

  changeCurrent(message) {
    this.currentReceiver = this.receiverId(message);
    this.getMessages();
  }

  getChatroom() {
    this.http.get(`/groups/${this.currentRoom._id}`).subscribe(chatroom => {
      this.messages = chatroom;
    });
  }

  currentChatroom(chatroom) {
    this.currentRoom = chatroom;
    this.getChatroom();
  }

  getMessages() {
    this.http
      .get(`/users/${this.currentReceiver}/messages`)
      .subscribe(messages => {
        this.messages = messages;
        this.changeRender("friends");
      });
  }
  receiverId(message) {
    return message.sender.username === this.currentUserUsername
      ? message.receiver._id
      : message.sender._id;
  }

  getChatrooms() {
    this.http.get("/groups").subscribe(data => {
      this.latestChatrooms = data;
      this.currentRoom = this.latestChatrooms[0];
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

  createChatroom() {
    this.http
      .post("/groups", { name: this.chatroomName })
      .subscribe(chatroom => {
        this.latestChatrooms.push(chatroom);
      });
  }
  addMember(user) {
    if (!this.toggle) {
      this.http
        .post(`/groups/${this.currentRoom._id}/add`, { user: user._id })
        .subscribe(data => {
          if (data["success"]) this.currentRoom.users.push(user);
        });
    }
  }
  fetchFriends() {
    this.toggle = false;
    this.http
      .get(`/users/${this.currentUser._id}/friends`)
      .subscribe(friends => {
        console.log(friends);
        this.friends = friends;
      });
  }
  leaveChatroom() {
    this.http.get(`/groups/${this.currentRoom._id}/leave`).subscribe(data => {
      console.log(data);
    });
  }
  members() {
    this.toggle = true;
    this.friends = this.currentRoom.users;
  }
}
