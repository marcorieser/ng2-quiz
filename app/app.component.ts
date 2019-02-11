import {Component, OnInit} from '@angular/core';
import {QuestionService} from "./shared/service/question.service";
import {QuestionCategory, Question, Group} from "./shared/models/models";
import {GroupService} from "./shared/service/group.service";

@Component({
    selector: 'quiz-app',
    templateUrl: './app/app.component.html',
    styleUrls: ['./app/app.component.css'],
})

export class AppComponent implements OnInit {
    questions: QuestionCategory[];
    activeQuestion: Question;
    lastTurn: number;
    activeGroup: number;
    groupSwitched: boolean = false;
    groups: Group[];

    constructor(private questionService: QuestionService, private groupService: GroupService) {
    }

    ngOnInit() {
        if (this.loadGame()) {
            return;
        }
        this.initializeGame();
    }

    selectQuestion(question: Question) {
        if (question.answered) {
            return;
        }
        this.activeQuestion = question;
    }

    switchGroup() {
        this.activeGroup = this.activeGroup === 0 ? 1 : 0;
        this.groupSwitched = true;
    }

    questionAnswered(data) {
        if (data.correct) {
            this.groups[this.activeGroup].score += (data.groupSwitched ? data.question.difficulty / 2 : data.question.difficulty);
        }

        data.question.answered = true;

        this.activeGroup = this.lastTurn === 0 ? 1 : 0;
        this.lastTurn = this.activeGroup;
        this.activeQuestion = null;
        this.groupSwitched = false;

        this.saveGame();
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

        if (this.groupSwitched) {
            return false;
        }

        return this.groups[this.activeGroup][type];
    }

    setJoker(type: string, group: number) {
        if (!this.jokerAvailable(type, group)) {
            return;
        }
        this.groups[this.activeGroup][type]--;
        this.activeQuestion.jokerInUse = true;

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

    private initializeGame() {
        this.activeGroup = Math.floor(Math.random() * (1 + 1));
        this.lastTurn = this.activeGroup;
        this.activeQuestion = null;

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
                this.groupService.getGroups()
                    .subscribe(groups => {
                        this.groups = groups;

                        this.saveGame();
                    });
            });
    }

    resetGame() {
        localStorage.removeItem('questions');
        localStorage.removeItem('lastTurn');
        localStorage.removeItem('groups');
        this.initializeGame();
    }

    private loadGame() {
        let questions = localStorage.getItem('questions'),
            lastTurn = localStorage.getItem('lastTurn'),
            groups = localStorage.getItem('groups');

        if (questions === null || lastTurn === null || groups === null) {
            return false;
        }

        this.questions = JSON.parse(questions);
        this.lastTurn = JSON.parse(lastTurn);
        this.groups = JSON.parse(groups);
        this.activeGroup = this.lastTurn;

        return true;
    }

    private saveGame() {
        localStorage.setItem('questions', JSON.stringify(this.questions));
        localStorage.setItem('lastTurn', JSON.stringify(this.lastTurn));
        localStorage.setItem('groups', JSON.stringify(this.groups));
    }
}
