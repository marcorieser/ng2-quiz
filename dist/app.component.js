"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var question_service_1 = require("./shared/service/question.service");
var group_service_1 = require("./shared/service/group.service");
var AppComponent = /** @class */ (function () {
    function AppComponent(questionService, groupService) {
        this.questionService = questionService;
        this.groupService = groupService;
        this.groupSwitched = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        if (this.loadGame()) {
            return;
        }
        this.initializeGame();
    };
    AppComponent.prototype.selectQuestion = function (question) {
        if (question.answered) {
            return;
        }
        this.activeQuestion = question;
    };
    AppComponent.prototype.switchGroup = function () {
        this.activeGroup = this.activeGroup === 0 ? 1 : 0;
        this.groupSwitched = true;
    };
    AppComponent.prototype.questionAnswered = function (data) {
        if (data.correct) {
            this.groups[this.activeGroup].score += (data.groupSwitched ? data.question.difficulty / 2 : data.question.difficulty);
        }
        data.question.answered = true;
        this.activeGroup = this.lastTurn === 0 ? 1 : 0;
        this.lastTurn = this.activeGroup;
        this.activeQuestion = null;
        this.groupSwitched = false;
        this.saveGame();
    };
    AppComponent.prototype.jokerAvailable = function (type, group) {
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
    };
    AppComponent.prototype.setJoker = function (type, group) {
        if (!this.jokerAvailable(type, group)) {
            return;
        }
        this.groups[this.activeGroup][type]--;
        this.activeQuestion.jokerInUse = true;
        if (type === 'phone') {
            return;
        }
        for (var _i = 0, _a = this.activeQuestion.answers; _i < _a.length; _i++) {
            var answer = _a[_i];
            if (answer.fifty) {
                continue;
            }
            answer.choosen = true;
        }
    };
    AppComponent.prototype.initializeGame = function () {
        var _this = this;
        this.activeGroup = Math.floor(Math.random() * (1 + 1));
        this.lastTurn = this.activeGroup;
        this.activeQuestion = null;
        this.questionService.getQuestions()
            .subscribe(function (questions) {
            _this.questions = questions;
            var id = 0, index = 1;
            for (var _i = 0, _a = _this.questions; _i < _a.length; _i++) {
                var category = _a[_i];
                for (var _b = 0, _c = category.questions; _b < _c.length; _b++) {
                    var question = _c[_b];
                    question.id = id;
                    question.index = index;
                    question.answered = false;
                    id++;
                    index++;
                }
                index = 1;
            }
            _this.groupService.getGroups()
                .subscribe(function (groups) {
                _this.groups = groups;
                _this.saveGame();
            });
        });
    };
    AppComponent.prototype.resetGame = function () {
        localStorage.removeItem('questions');
        localStorage.removeItem('lastTurn');
        localStorage.removeItem('groups');
        this.initializeGame();
    };
    AppComponent.prototype.loadGame = function () {
        var questions = localStorage.getItem('questions'), lastTurn = localStorage.getItem('lastTurn'), groups = localStorage.getItem('groups');
        if (questions === null || lastTurn === null || groups === null) {
            return false;
        }
        this.questions = JSON.parse(questions);
        this.lastTurn = JSON.parse(lastTurn);
        this.groups = JSON.parse(groups);
        this.activeGroup = this.lastTurn;
        return true;
    };
    AppComponent.prototype.saveGame = function () {
        localStorage.setItem('questions', JSON.stringify(this.questions));
        localStorage.setItem('lastTurn', JSON.stringify(this.lastTurn));
        localStorage.setItem('groups', JSON.stringify(this.groups));
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'quiz-app',
            templateUrl: './app/app.component.html',
            styleUrls: ['./app/app.component.css'],
        }),
        __metadata("design:paramtypes", [question_service_1.QuestionService, group_service_1.GroupService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
