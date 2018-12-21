import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {QuestionCategory} from "../models/models";
import {AbstractService} from "./abstract.service";

@Injectable()
export class QuestionService extends AbstractService {


    constructor(http: Http) {
        super(http);
    }

    getQuestions(): Observable<QuestionCategory[]> {
        return this.http.get('/questions.json')
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }
}
