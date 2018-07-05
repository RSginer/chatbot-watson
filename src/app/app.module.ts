import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessengerModule } from 'ngx-messenger';
import { WatsonHttpService } from './watson-http-service';
 
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MessengerModule
  ],
  providers: [WatsonHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
