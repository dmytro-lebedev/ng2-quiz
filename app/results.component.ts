import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { UserAnswerService } from './user-answer.service';
import { UserAnswer } from './user-answer.model';

@Component({
  moduleId: module.id,
  selector: 'my-results',
  templateUrl: 'results.component.html',
  styleUrls: ['results.component.css'],
  providers: [UserAnswerService]
})
export class ResultsComponent implements OnInit {
  userAnswers: UserAnswer[];
  score = 0;
  failed = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private userAnswerService: UserAnswerService
  ) {
  }

  ngOnInit(): void {
    if (!this.userService.getSessionUser()) {
      this.router.navigate(['/login']);
      return;
    }

    if (typeof this.userService.getSessionUser().score === 'undefined') {
      this.router.navigate(['/quiz']);
      return;
    }

    this.score = this.userService.getSessionUser().score;

    this.userAnswerService.getAnswers(this.userService.getSessionUser().id)
        .then((_userAnswers: UserAnswer[]) => {
          this.userAnswers = _userAnswers;
        })
        .catch(() => this.failed = true);
  }

  onRetry(): void {
    this.failed = false;
    this.ngOnInit();
  }
}
