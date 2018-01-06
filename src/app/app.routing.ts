import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './question/question-list.component';
import { SigninScreenComponent } from './auth/signin-screen.component';
import { QUESTION_ROUTES } from './question/question.routing';

const APP_ROUTES: Routes = [
    { path: '', component: QuestionListComponent, pathMatch: 'full' },
    { path: 'signin', component: SigninScreenComponent },
    { path: 'questions', children: QUESTION_ROUTES }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);

//Lo mismo para el signUp. que no se a terminado 