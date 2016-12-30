import {Component, OnInit} from '@angular/core';
import {QuestionService} from "./shared/service/question.service";
import {QuestionCategory, Question} from "./shared/models/models";

@Component({
    selector: 'quiz-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css']
})

export class AppComponent implements OnInit {
    questions: QuestionCategory[];
    activeQuestion: Question;
    lastTurn: number;
    activeGroup: number;
    groups = [
        {
            name: 'Gruppe 1',
            score: 0,
            fifty: 1,
            phone: 1
        },
        {
            name: 'Gruppe 2',
            score: 0,
            fifty: 1,
            phone: 1
        }
    ];

    constructor(private questionService: QuestionService) {
    }

    ngOnInit() {
        this.questionService.getQuestions()
            .subscribe(questions => {
                this.questions = questions;
                let id = 0,
                    index = 1;
                for (let category of this.questions) {
                    for (let question of category.questions) {
                        question.id = id;
                        question.index = index;
                        question.answered = false;

                        id++;
                        index++;
                    }
                    index = 1;

                }
            });
        this.activeGroup = 0;
        this.lastTurn = 0;
    }

    selectQuestion(question: Question) {
        if (question.answered) {
            return;
        }
        this.activeQuestion = question;
    }

    switchGroup() {
        this.activeGroup = this.activeGroup === 0 ? 1 : 0;
    }

    questionAnswered(data) {
        if (data.correct) {
            this.groups[this.activeGroup].score += data.question.difficulty;
        }

        data.question.answered = true;

        this.activeGroup = this.lastTurn === 0 ? 1 : 0;
        this.lastTurn = this.activeGroup;
        this.activeQuestion = null;
    }

    jokerAvailable(type: string, group: number) {
        if (!this.activeQuestion) {
            return false;
        }

        if (this.activeQuestion.type !== 'choose') {
            return false;
        }

        if (group !== this.activeGroup) {
            return false;
        }
        return this.groups[this.activeGroup][type];
    }

    setJoker(type: string, group: number) {
        if (!this.jokerAvailable(type, group)) {
            return;
        }
        this.groups[this.activeGroup][type]--;

        if (type === 'phone') {
            return;
        }

        for (let answer of this.activeQuestion.answers) {
            if (answer.fifty) {
                continue;
            }
            answer.choosen = true;
        }
    }
}
