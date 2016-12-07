import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { QuestionAnswer } from './question-answer.model';

@Injectable()
export class QuestionAnswerService {
    private readonly url = 'app/questionAnswers';

    constructor(private http: Http) { }

    getAnswers(questionId: number): Promise<QuestionAnswer[]> {
        return this.http
            .get(`${this.url}?questionId=^${questionId}$`)
            .toPromise()
            .then((response: Response) => response.json().data as QuestionAnswer[])
            .catch(this.handleError);
    }

    getAnswer(id: number): Promise<QuestionAnswer> {
        return this.http
            .get(`${this.url}/${id}`)
            .toPromise()
            .then((response: Response) => response.json().data as QuestionAnswer)
            .catch(this.handleError);
    }

    getCorrectAnswer(questionId: number): Promise<QuestionAnswer> {
        return this.getAnswers(questionId)
            .then((questionAnswers: QuestionAnswer[]) => questionAnswers
                .find(questionAnswer => questionAnswer.correct))
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error: ', error);
        return Promise.reject(error.message || error);
    }
}
