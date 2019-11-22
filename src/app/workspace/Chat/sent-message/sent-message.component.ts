import { Component } from '@angular/core';
// import { ChatService } from '../../chat.service';
import { ChatService } from '../../chat.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-sent-message',
  templateUrl: './sent-message.component.html',
  styleUrls: ['./sent-message.component.css']
})
export class SentMessageComponent {
  feed: any;

  constructor( private chat:ChatService ,
              private data:DataService  ){
          
          this.data.currentMessage$.subscribe(message=>{
              this.feed=this.chat.getMessages();
        })
  }
}
