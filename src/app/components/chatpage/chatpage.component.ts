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
        console.log(this.messages);
      });
  }

  messages: any;
  
  latest: any;
}
