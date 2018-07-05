import { Injectable } from '@angular/core';
import * as watson from 'watson-developer-cloud';
import { environment } from '../environments/environment';

@Injectable()
export class WatsonHttpService {

    private assistant: any;

    constructor() {
        this.assistant = new watson.AssistantV1({
            username: environment.watson.username,
            password: environment.watson.password,
            version: '2018-02-16'
        });
    }

    sendMessage(message: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.assistant.message({
                workspace_id: environment.watson.workspaceId,
                input: { 'text': message }
            }, function (err, response) {
                if (err) {
                    console.log('error:', err);
                    reject(err)
                } else {
                    console.log(JSON.stringify(response, null, 2));
                    resolve(response)
                }
            });
        });
    });

}
}