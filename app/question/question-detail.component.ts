import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Question, Answer} from "../shared/models/models";

@Component({
    selector: 'question-detail',
    templateUrl: './app/question/question-detail.component.html',
    styleUrls: ['./app/question/question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
    @Output()
    questionAnswered = new EventEmitter();
    @Output()
    switchGroup = new EventEmitter();

    @Input()
    question: Question;

    groupSwitched: boolean = false;
    solutionVisible: boolean;

    constructor() {
    }

    ngOnInit() {
    }

    evaluateOthers(correct: boolean) {
        if (correct) {
            this.questionAnswered.emit({question: this.question, correct: true, groupSwitched: this.groupSwitched});
            return;
        }
        if (this.groupSwitched || this.question.jokerInUse) {
            this.questionAnswered.emit({question: this.question, correct: false, groupSwitched: this.groupSwitched});
            return;
        }
        this.solutionVisible = false;
        this.groupSwitched = true;
        this.switchGroup.emit();
    }

    evaluateChoose(answer: Answer) {
        if (answer.correct) {
            this.questionAnswered.emit({question: this.question, correct: true, groupSwitched: this.groupSwitched});
            return;
        }
        if (this.groupSwitched || this.question.jokerInUse) {
            this.questionAnswered.emit({question: this.question, correct: false, groupSwitched: this.groupSwitched});
            return;
        }

        answer.choosen = true;
        this.groupSwitched = true;
        this.switchGroup.emit();
    }

}
