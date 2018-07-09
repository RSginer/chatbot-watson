import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class WatsonHttpService {

    private assistant: any;
    public httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        })
      };
    constructor(
        private httpClient: HttpClient
    ) {
    }


    sendMessage(message: string): Observable<any> {    
       return this.httpClient.post(`http://localhost:3000`, {message: message}, this.httpOptions);
    }

    start() {
            return this.httpClient.post(`http://localhost:3000/start`, null, this.httpOptions);
         
    }

}