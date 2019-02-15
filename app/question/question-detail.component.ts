import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Question, Answer} from "../shared/models/models";
import {SoundService} from "../shared/service/sound.service";

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
    correctAnswer: string = '';

    constructor(private soundService: SoundService) {
    }

    ngOnInit() {
    }

    evaluateOthers(correct: boolean) {
        if (correct) {
            this.questionAnswered.emit({question: this.question, correct: true, groupSwitched: this.groupSwitched});
            this.soundService.playSound('correct');
            return;
        }
        if (this.groupSwitched || this.question.jokerInUse) {
            this.questionAnswered.emit({question: this.question, correct: false, groupSwitched: this.groupSwitched});
            this.soundService.playSound('wrong');
            return;
        }
        this.soundService.playSound('wrong');

        this.solutionVisible = false;
        this.groupSwitched = true;
        this.switchGroup.emit();
    }

    evaluateChoose(answer: Answer) {
        if (answer.correct) {
            this.soundService.playSound('correct');

            this.correctAnswer = answer.title;
            this.solutionVisible = true;
            setTimeout(() => {
                this.questionAnswered.emit({question: this.question, correct: true, groupSwitched: this.groupSwitched});
            }, 3000);
            return;
        }

        answer.choosen = true;
        this.soundService.playSound('wrong');

        if (this.groupSwitched || this.question.jokerInUse) {
            this.correctAnswer = this.getCorrectAnswer().title;
            this.solutionVisible = true;
            setTimeout(() => {
                this.questionAnswered.emit({
                    question: this.question,
                    correct: false,
                    groupSwitched: this.groupSwitched
                });
            }, 5000);
            return;
        }

        this.groupSwitched = true;
        this.switchGroup.emit();
    }

    getCorrectAnswer() {
        for (let answer of this.question.answers) {
            if (answer.correct) {
                return answer;
            }
        }
    }
}