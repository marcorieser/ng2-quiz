import {Component, OnInit, Input} from '@angular/core';
import {Question} from "../shared/models/models";

@Component({
    selector: 'question',
    templateUrl: './app/question/question.component.html',
    styleUrls: ['./app/question/question.component.css']
})
export class QuestionComponent implements OnInit {
    @Input()
    question: Question;

    constructor() {
    }

    ngOnInit() {
    }

}
