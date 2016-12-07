import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Question } from './question.model';
import { UserService } from './user.service';
import { QuestionService } from './question.service';
import { UserAnswerService } from './user-answer.service';
import { QuestionAnswer } from './question-answer.model';

@Component({
    moduleId: module.id,
    selector: 'my-quiz',
    templateUrl: 'quiz.component.html',
    providers: [QuestionService, UserAnswerService]
})
export class QuizComponent implements OnInit {
    private totalAnswersCount = 0;
    private correctAnswersCount = 0;
    questions: Question[];
    question: Question;
    failed = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private questionService: QuestionService) {
    }

    ngOnInit(): void {
        if (!this.userService.getSessionUser()) {
            this.router.navigate(['/login']);
            return;
        }

        if (typeof this.userService.getSessionUser().score === 'number') {
            this.router.navigate(['/results']);
            return;
        }

        this.questionService.getQuestions()
            .then((_questions: Question[]) => {
                this.questions = _questions;
                this.nextQuestion();
            })
            .catch(() => this.failed = true);
    }

    onRetry(): void {
        this.failed = false;
        this.correctAnswersCount = 0;
        this.ngOnInit();
    }

    onAnswer(questionAnswer: QuestionAnswer) {
        this.totalAnswersCount++;
        if (questionAnswer.correct) {
            this.correctAnswersCount++;
        }

        this.nextQuestion();
    }

    private nextQuestion(): void {
        this.question = this.questions.shift();

        if (!this.question) {
            this.userService.getSessionUser().score = this.correctAnswersCount / this.totalAnswersCount;
            this.userService.update(this.userService.getSessionUser())
                .then(() => this.router.navigate(['/results']))
                .catch(() => this.failed = true);
        }
    }
}
