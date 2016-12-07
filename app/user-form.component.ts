import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './user.service';
import { User } from './user.model';

@Component({
    moduleId: module.id,
    selector: 'user-form',
    templateUrl: 'user-form.component.html',
    styleUrls: ['user-form.component.css']
})
export class UserFormComponent implements OnInit {
    user: User;
    submitted = false;

    constructor(
        private router: Router,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.removeSessionUser();
        this.user = new User('', '');
    }

    getSubmitText(): string {
        if (this.router.isActive('/register', true)) {
            return 'Register';
        } else {
            return 'Login';
        }
    }

    onSubmit(): void {
        this.submitted = true;

        if (this.router.isActive('/register', true)) {
            this.userService.register(this.user)
                .then(() => this.router.navigate(['/login']))
                .catch(() => this.submitted = false);
        } else {
            this.userService.login(this.user)
                .then(() => this.router.navigate(['/quiz']))
                .catch(() => this.submitted = false);
        }
    }
}
