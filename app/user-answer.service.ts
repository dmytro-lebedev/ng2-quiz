import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserAnswer } from './user-answer.model';

@Injectable()
export class UserAnswerService {
    private readonly url = 'app/userAnswers';

    constructor(private http: Http) { }

    getAnswers(userId: number): Promise<UserAnswer[]> {
        return this.http
            .get(`${this.url}?userId=^${userId}$`)
            .toPromise()
            .then((response: Response) => response.json().data as UserAnswer[])
            .catch(this.handleError);
    }

    postAnswer(userAnswer: UserAnswer): Promise<UserAnswer> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .post(this.url, JSON.stringify(userAnswer), { headers: headers })
            .toPromise()
            .then((response: Response) => response.json().data)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error: ', error);
        return Promise.reject(error.message || error);
    }
}
