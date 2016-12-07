import { Component } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    constructor(private userService: UserService) {
    }

    getSessionUser(): User {
        return this.userService.getSessionUser();
    }
}
