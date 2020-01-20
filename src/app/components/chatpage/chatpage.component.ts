import { Component, OnInit, HostListener } from "@angular/core";
import { HttpService } from "src/app/services/http/http.service";
import { DataService } from 'src/app/services/data/data.service';
import * as io from 'socket.io-client';
import { WebsocketService } from 'src/app/services/Websocket/websocket.service';
// import { WebsocketService } from '../../services/Websocket/Websocket.service'
 

@Component({
  selector: "app-chatpage",
  templateUrl: "./chatpage.component.html",
  styleUrls: ["./chatpage.component.scss"]
})
export class ChatpageComponent implements OnInit {
  constructor(public http: HttpService, public data : DataService, private socketService : WebsocketService) {}
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
  page  = "chat"; 
  public innerWidth: any;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
  this.innerWidth = window.innerWidth;
  console.log(this.innerWidth)
}
    socket:any;
  // ngAfterViewInit(): void {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   var scrollable = document.getElementById("scrollable")
  //   scrollable.scrollTop = scrollable.scrollHeight
  // }
  ngOnInit() {
    
    this.socket =  io("http://127.0.0.1:7000")
    this.innerWidth = window.innerWidth;
    console.log(window.innerWidth)
    this.currentUserUsername = localStorage.getItem("username");
    this.http.get(`/users/${this.currentUserUsername}`).subscribe(data => {
      this.currentUser = data["user"];
    });
    this.http.get(`/messages/latest`).subscribe((data: any) => {
        this.latest = data
      
      if (this.latest.length != 0) {
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
    var scroll = document.getElementById("scrollable")
    console.log(scroll)
    if (this.render === "friends") {
      this.http
        .post(`/users/${this.currentReceiver}/messages`, {
          content: this.content
        })
        .subscribe(data => {
          this.messages.push(data);
          scroll.scrollTop = scroll.scrollHeight
        });
    } else if (this.render === "chatrooms") {
      this.http
        .post(`/groups/${this.currentRoom._id}`, {
          content: this.content
        })
        .subscribe(data => {
          this.messages.push(data);
          scroll.scrollTop = scroll.scrollHeight
        });
    }
    this.content = ""
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
    this.messages = undefined;
    if(this.currentReceiver){
      this.http
        .get(`/users/${this.currentReceiver}/messages`)
        .subscribe(messages => {
          this.messages = messages;
   
          this.changeRender("friends");
        });

    }else{
      this.changeRender("friends");
    }
  }
  receiverId(message) {
    return message.sender.username === this.currentUserUsername
      ? message.receiver._id
      : message.sender._id;
  }
  getChatrooms() {
    this.http.get("/groups").subscribe(data => {
      this.latestChatrooms = data;
      this.messages = null
      if(this.latestChatrooms.length != 0){
        this.currentRoom = this.latestChatrooms[0];
        this.getChatroom();
      }
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
    getTime(id){
      return this.data.calcTime(this.data.mongoIdToDate(id), null)
    }
    
  }
