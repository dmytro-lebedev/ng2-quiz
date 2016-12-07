import { Component, Input, OnInit } from '@angular/core';

import { QuestionAnswerService } from './question-answer.service';
import { QuestionAnswer } from './question-answer.model';
import { UserAnswer } from './user-answer.model';
import { QuestionService } from './question.service';
import { Question } from './question.model';

@Component({
    moduleId: module.id,
    selector: 'question-result',
    templateUrl: 'question-result.component.html',
    styleUrls: ['question-result.component.css'],
    providers: [QuestionService, QuestionAnswerService]
})
export class QuestionResultComponent implements OnInit {
    @Input() userAnswer: UserAnswer;
    question: Question;
    questionAnswer: QuestionAnswer;
    correctQuestionAnswer: QuestionAnswer;
    failed = false;

    constructor(
        private questionService: QuestionService,
        private questionAnswerService: QuestionAnswerService
    ) {
    }

    ngOnInit(): void {
        this.questionService.getQuestion(this.userAnswer.questionId)
            .then((question: Question) => this.question = question)
            .catch(() => this.failed = true);

        this.questionAnswerService.getAnswer(this.userAnswer.questionAnswerId)
            .then((quesionAnswer: QuestionAnswer) => this.questionAnswer = quesionAnswer)
            .catch(() => this.failed = true);

        this.questionAnswerService.getCorrectAnswer(this.userAnswer.questionId)
            .then((quesionAnswer: QuestionAnswer) => this.correctQuestionAnswer = quesionAnswer)
            .catch(() => this.failed = true);
    }

    onRetry(): void {
        this.failed = false;
        this.ngOnInit();
    }
}
