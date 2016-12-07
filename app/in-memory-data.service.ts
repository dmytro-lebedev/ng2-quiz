import { User } from './user.model';
import { Question } from './question.model';
import { QuestionAnswer } from './question-answer.model';
import { UserAnswer } from './user-answer.model';

export class InMemoryDataService {
    createDb() {
        let users: User[] = [
            {id: 1, email: 'dmytro.lebedev@gmail.com', password: 'test'}
        ];

        let questions: Question[] = [
            {
                id: 1,
                text: 'Which is not an advantage of using a closure?'
            },
            {
                id: 2,
                text: 'To create a columned list of two-line email subjects and dates for a master-detail view, which are the most semantically correct?'
            },
            {
                id: 3,
                text: 'To pass an array of strings to a function, you should not use...'
            },
            {
                id: 4,
                text: 'Given <div id="outer"><div class="inner"></div></div>, which of these two is the most performant way to select the inner div?'
            },
            {
                id: 5,
                text: `Given this:
                
angular.module('myModule, [])
    .service('myService', (function() {
    var message = 'Message one!';
    var getMessage = function() {    
        return this.message;
    };

    this.message = 'Message two!';
    this.getMessage = function() {
        return message;
    };

    return {
        getMessage: getMessage,
        message: 'Message three!';
    };
}) ());

Which message will be returned by injecting this service and executing "myService.getMessage()"?`
            }
        ];

        let questionAnswers: QuestionAnswer[] = [
            // questionId: 1
            {
                id: 1,
                questionId: 1,
                text: 'Prevent pollution of global scope',
                correct: true
            },
            {
                id: 2,
                questionId: 1,
                text: 'Encapsulation',
                correct: false
            },
            {
                id: 3,
                questionId: 1,
                text: 'Private properties and methods',
                correct: false
            },
            {
                id: 4,
                questionId: 1,
                text: "Allow conditional use of 'strict mode’",
                correct: false
            },
            // questionId: 2
            {
                id: 5,
                questionId: 2,
                text: '<div>+<span>',
                correct: false
            },
            {
                id: 6,
                questionId: 2,
                text: '<tr>+<td>',
                correct: true
            },
            {
                id: 7,
                questionId: 2,
                text: '<ul>+<li>',
                correct: false
            },
            {
                id: 8,
                questionId: 2,
                text: '<p>+<br>',
                correct: false
            },
            {
                id: 9,
                questionId: 2,
                text: 'all of these',
                correct: false
            },
            // questionId: 3
            {
                id: 10,
                questionId: 3,
                text: 'fn.apply(this, stringsArray)',
                correct: false
            },
            {
                id: 11,
                questionId: 3,
                text: 'fn.call(this, stringsArray)',
                correct: false
            },
            {
                id: 12,
                questionId: 3,
                text: 'fn.bind(this, stringsArray)',
                correct: true
            },
            // questionId: 4
            {
                id: 13,
                questionId: 4,
                text: 'getElementById("outer").children[0]',
                correct: true
            },
            {
                id: 14,
                questionId: 4,
                text: 'getElementsByClassName("inner")[0]',
                correct: false
            },
            // questionId: 5
            {
                id: 15,
                questionId: 5,
                text: '1',
                correct: true
            },
            {
                id: 16,
                questionId: 5,
                text: '2',
                correct: false
            },
            {
                id: 17,
                questionId: 5,
                text: '3',
                correct: false
            }
        ];

        let userAnswers: UserAnswer[] = [];

        return {
            users,
            questions,
            questionAnswers,
            userAnswers
        };
    }
}
