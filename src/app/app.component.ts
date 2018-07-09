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
  conversation = [];

  constructor(
    private watsonHttpService: WatsonHttpService
  ) {

  }

  ngOnInit() {
    this.watsonHttpService.start().toPromise().then((res: any) => {
      this.conversation.push(
        {
          text: res.text,
          date: new Date(),
          user: {
            id: 2,
            imageUrl: '/assets/images/ibm-watson.jpg',
            name: 'Bot'
          }
        }
      )
    })
  }

  async sendMessage(text) {
    this.conversation.push({
      text: text,
      date: new Date(),
      user: {
        id: 1,
        imageUrl: 'https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_960_720.png',
        name: 'Rubén'
      }
    })
    try {
     const response = await this.watsonHttpService.sendMessage(text).toPromise();
     //const message = this.parseWatsonResponse(response);
     console.log(response)
     this.conversation.push({
      text: response.text,
      date: new Date(),
      user: {
        id: 2,
        imageUrl: '/assets/images/ibm-watson.jpg',
        name: 'Bot'
      }
    });
    } catch (error) {
      console.log(error);
    }
  }

  parseWatsonResponse(response): any {
    console.log(response);
  }

}
