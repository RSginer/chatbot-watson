import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessengerModule } from 'ngx-messenger';
import { WatsonHttpService } from './watson-http-service';
import { HttpClientModule } from '@angular/common/http';
 
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MessengerModule,
    HttpClientModule
  ],
  providers: [WatsonHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
