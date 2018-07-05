import { Component, OnInit } from '@angular/core';
import { WatsonHttpService } from './watson-http-service';

@Component({
  selector: 'app-root',
  template: `<msg-chat-box
                (onSend)="sendMessage($event)"
                [isFullScreen]="true"
                [conversation]="conversation"
                [currentUserId]="currentUserId">
             </msg-chat-box>`,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  currentUserId = 1;
  conversation = [
    {
      text: 'Hola! ¿Cómo puedo ayudarte?',
      date: new Date(),
      user: {
        id: 2,
        imageUrl: '/assets/images/ibm-watson.jpg',
        name: 'Bot'
      }
    }
  ];

  constructor(
    private watsonHttpService: WatsonHttpService
  ) {

  }

  ngOnInit() {
    
  }

  async sendMessage(text) {
    try {
     const response = await this.watsonHttpService.sendMessage(text).toPromise();
     const message = this.parseWatsonResponse(response);
     this.conversation.push(message);
    } catch (error) {
      console.log(error);
    }
  }

  parseWatsonResponse(response): any {
    console.log(response);
  }

}
