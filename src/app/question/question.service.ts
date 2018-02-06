import { Injectable } from '@angular/core';
import { Question } from './question.model';
import { Answer } from '../anwser/answer.model';
import { Http, Headers, Response, RequestOptions, Request, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import urljoin from 'url-join';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import 'rxjs/Rx'
import { ReactiveFormsModule } from '@angular/forms';

@Injectable()
export class QuestionService {
    private questionsUrl : string;
    constructor(private http: Http) {
        this.questionsUrl = urljoin(environment.apiUrl, 'questions');
    }
    getQuestions(): Promise<void | Question[]> {
        return this.http.get(this.questionsUrl)
        .toPromise()
        .then(response => response.json() as Question[])
        .catch(this.handleError);
    }


    getQuestion(id): Promise<void | Question> {
        const url = urljoin(this.questionsUrl, id);
        return this.http.get(url)
        .toPromise()
        .then(response => response.json() as Question)
        .catch(this.handleError);
    }

    handleError(error: any) {
        const errMsg = error.message ? error.message :
            error.status ? `${error.status} - ${error.message}` : 'Server error';
        console.log(errMsg);
    }

    addQuestion(question: Question) {
        const body = JSON.stringify(question);
        const headers = new Headers({'Content-Type': 'application/json'});
        const options = new RequestOptions({ headers: headers, method: 'POST'})

        return this.http.post(this.questionsUrl, body,options)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }

    addAnswer(answer: Answer) {
        const a = {
            description: answer.description,
            question: {
                _id: answer.question._id
            }
        };
        const body = JSON.stringify(a);
        const headers = new Headers({'Content-Type': 'application/json'});
        const url = urljoin(this.questionsUrl, answer.question._id, 'answers');
        return this.http.post(url, body, { headers })
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));
    }
}