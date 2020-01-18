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
  ngOnInit() {
    this.currentUser = localStorage.getItem("username");
    this.http.get(`/messages/latest`).subscribe(data => {
      this.latest = data;
      this.currentReceiver =
        this.latest[0].sender.username === this.currentUser
          ? this.latest[0].receiver._id
          : this.latest[0].sender._id;
      this.http
        .get(`/users/${this.currentReceiver}/messages`)
        .subscribe(messages => {
          this.messages = messages;
        });
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

  messages: any;
  // {
  //   username: "Mathew MacConhey",
  //   content: "all right all right all right ",
  //   sent: "5 min ago",
  //   senderPhoto: ""
  // },
  // {
  //   username: "Samuel L Jakson",
  //   content: "shut up  Mothe*****************er ",
  //   sent: "5 min ago",
  //   senderPhoto: ""
  // },
  // {
  //   username: "Kevin Hart",
  //   content: "Oh no, no no no  ",
  //   sent: "5 min ago",
  //   senderPhoto: ""
  // },
  // {
  //   username: "Dave Chapelle",
  //   content: "Yeaah I said it ",
  //   sent: "5 min ago",
  //   senderPhoto: ""
  // },
  // {
  //   username: "Arnold SChwarziniger",
  //   content: "I'm Back",
  //   sent: "5 min ago",
  //   senderPhoto: ""
  // },
  // {
  //   username: "Amelia Clark",
  //   content: "Dracarys ",
  //   sent: "5 min ago",
  //   senderPhoto: ""
  // }

  latest: any;
}
