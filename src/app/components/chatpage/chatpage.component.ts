import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatpage',
  templateUrl: './chatpage.component.html',
  styleUrls: ['./chatpage.component.scss']
})
export class ChatpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  messages = [
    {
      username:"Mathew MacConhey",
      content: "all right all right all right ",
      sent:"5 min ago",
      senderPhoto:""
    },
    {
      username:"Samuel L Jakson",
      content: "shut up  Mothe*****************er ",
      sent:"5 min ago",
      senderPhoto:""
    },

    {
      username:"Kevin Hart",
      content: "Oh no, no no no  ",
      sent:"5 min ago",
      senderPhoto:""
    },

    {
      username:"Dave Chapelle",
      content: "Yeaah I said it ",
      sent:"5 min ago",
      senderPhoto:""
    },
    {
      username:"Arnold SChwarziniger",
      content: "I'm Back",
      sent:"5 min ago",
      senderPhoto:""
    },
    {
      username:"Amelia Clark",
      content: "Dracarys ",
      sent:"5 min ago",
      senderPhoto:""
    }
 ]

}
