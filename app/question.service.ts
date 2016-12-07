import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Question } from './question.model';

@Injectable()
export class QuestionService {
  private readonly url = 'app/questions';

  constructor(private http: Http) { }

  getQuestions(): Promise<Question[]> {
    return this.http
      .get(this.url)
      .toPromise()
      .then((response: Response) => response.json().data as Question[])
      .catch(this.handleError);
  }

  getQuestion(id: number): Promise<Question> {
    return this.http
        .get(`${this.url}/${id}`)
        .toPromise()
        .then((response: Response) => response.json().data as Question)
        .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error: ', error);
    return Promise.reject(error.message || error);
  }
}
