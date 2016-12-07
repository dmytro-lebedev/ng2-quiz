import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

import { Question } from './question.model';
import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswer } from './question-answer.model';
import { UserAnswer } from './user-answer.model';
import { UserService } from './user.service';
import { UserAnswerService } from './user-answer.service';

@Component({
  moduleId: module.id,
  selector: 'question-form',
  templateUrl: 'question-form.component.html',
  styleUrls: ['question-form.component.css'],
  providers: [QuestionAnswerService, UserAnswerService]
})
export class QuestionFormComponent implements OnInit {
  private _question: Question;

  @Input()
  set question(question: Question) {
    this._question = question;
    this.submitted = false;
    this.questionAnswerId = null;
    this.ngOnInit();
  }

  get question(): Question {
    return this._question;
  }

  @Output() answer = new EventEmitter();

  questionAnswers: QuestionAnswer[];
  questionAnswerId: number;
  submitted = false;
  failed = false;

  constructor(
      private userService: UserService,
      private questionAnswerService: QuestionAnswerService,
      private userAnswerService: UserAnswerService
  ) {
  }

  ngOnInit(): void {
    this.questionAnswerService.getAnswers(this.question.id)
        .then((_quesionAnswers: QuestionAnswer[]) => this.questionAnswers = _quesionAnswers)
        .catch(() => this.failed = true);
  }

  onRetry(): void {
    this.failed = false;
    this.ngOnInit();
  }

  onSubmit(): void {
    let questionAnswer: QuestionAnswer = this.questionAnswers
        .find((_questionAnswer: QuestionAnswer) => _questionAnswer.id === this.questionAnswerId);

    let userAnswer = new UserAnswer(
        this.userService.getSessionUser().id,
        questionAnswer.questionId,
        questionAnswer.id
    );

    this.submitted = true;

    this.userAnswerService.postAnswer(userAnswer)
        .then(() => this.answer.emit(questionAnswer))
        .catch(() => this.submitted = false);
  }
}
