import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserFormComponent } from './user-form.component';
import { QuizComponent } from './quiz.component';
import { ResultsComponent } from './results.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: UserFormComponent
    },
    {
        path: 'register',
        component: UserFormComponent
    },
    {
        path: 'quiz',
        component: QuizComponent
    },
    {
        path: 'results',
        component: ResultsComponent
    },
    {
        path: 'logout',
        redirectTo: '/login',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

export const routedComponents = [UserFormComponent, QuizComponent, ResultsComponent];
