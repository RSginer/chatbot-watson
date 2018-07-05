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
          'Authorization': 'Basic ' + btoa(`${environment.watson.username}:${environment.watson.password}`)
        })
      };
    constructor(
        private httpClient: HttpClient
    ) {
    }


    sendMessage(message: string): Observable<any> {
        const data = {
            input: {
                text: message
            }
        }
    
       return this.httpClient.post(`https://gateway.watsonplatform.net/assistant/api/v1/workspaces/${environment.watson.workspaceId}/message?version=2018-02-16`, data, this.httpOptions);
    }

}