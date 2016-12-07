import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User } from './user.model';

@Injectable()
export class UserService {
    private readonly url = 'app/users';
    private sessionUser: User;

    constructor(private http: Http) { }

    login(user: User): Promise<User> {
        return this.getUser(user)
            .then((_user: User) => this.sessionUser = _user);
    }

    register(user: User): Promise<User> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.getUser(user)
            .then((_user: User) => {
                if (_user) {
                    throw _user;
                } else {
                    return this.http
                        .post(this.url, JSON.stringify(user), { headers: headers })
                        .toPromise()
                        .then((response: Response) => response.json().data)
                        .catch(this.handleError);
                }
            })
            .catch(this.handleError);
    }

    update(user: User): Promise<User> {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });

        return this.http
            .put(`${this.url}/${user.id}`, user, { headers: headers })
            .toPromise()
            .then(() => user)
            .catch(this.handleError);
    }

    getSessionUser(): User {
        return this.sessionUser;
    }

    removeSessionUser(): void {
        this.sessionUser = null;
    }

    private getUser(user: User): Promise<User> {
        return this.http
            .get(this.url)
            .toPromise()
            .then((response: Response) => (response.json().data as User[])
                .find(_user => _user.email === user.email && _user.password === user.password))
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('Error: ', error);
        return Promise.reject(error.message || error);
    }
}
