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
var models_1 = require("../shared/models/models");
var QuestionDetailComponent = /** @class */ (function () {
    function QuestionDetailComponent() {
        this.questionAnswered = new core_1.EventEmitter();
        this.switchGroup = new core_1.EventEmitter();
        this.groupSwitched = false;
        this.correctAnswer = '';
    }
    QuestionDetailComponent_1 = QuestionDetailComponent;
    QuestionDetailComponent.prototype.ngOnInit = function () {
    };
    QuestionDetailComponent.prototype.evaluateOthers = function (correct) {
        if (correct) {
            this.questionAnswered.emit({ question: this.question, correct: true, groupSwitched: this.groupSwitched });
            QuestionDetailComponent_1.playSound(true);
            return;
        }
        if (this.groupSwitched || this.question.jokerInUse) {
            this.questionAnswered.emit({ question: this.question, correct: false, groupSwitched: this.groupSwitched });
            QuestionDetailComponent_1.playSound(false);
            return;
        }
        QuestionDetailComponent_1.playSound(false);
        this.solutionVisible = false;
        this.groupSwitched = true;
        this.switchGroup.emit();
    };
    QuestionDetailComponent.prototype.evaluateChoose = function (answer) {
        var _this = this;
        if (answer.correct) {
            QuestionDetailComponent_1.playSound(true);
            this.correctAnswer = answer.title;
            this.solutionVisible = true;
            setTimeout(function () {
                _this.questionAnswered.emit({ question: _this.question, correct: true, groupSwitched: _this.groupSwitched });
            }, 3000);
            return;
        }
        answer.choosen = true;
        QuestionDetailComponent_1.playSound(false);
        if (this.groupSwitched || this.question.jokerInUse) {
            this.correctAnswer = this.getCorrectAnswer().title;
            this.solutionVisible = true;
            setTimeout(function () {
                _this.questionAnswered.emit({
                    question: _this.question,
                    correct: false,
                    groupSwitched: _this.groupSwitched
                });
            }, 5000);
            return;
        }
        this.groupSwitched = true;
        this.switchGroup.emit();
    };
    QuestionDetailComponent.prototype.getCorrectAnswer = function () {
        for (var _i = 0, _a = this.question.answers; _i < _a.length; _i++) {
            var answer = _a[_i];
            if (answer.correct) {
                return answer;
            }
        }
    };
    QuestionDetailComponent.playSound = function (correct) {
        if (correct === void 0) { correct = false; }
        var audio = new Audio();
        audio.src = correct ? 'assets/correct.mp3' : 'assets/wrong.mp3';
        audio.load();
        audio.play();
    };
    var QuestionDetailComponent_1;
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuestionDetailComponent.prototype, "questionAnswered", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], QuestionDetailComponent.prototype, "switchGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", models_1.Question)
    ], QuestionDetailComponent.prototype, "question", void 0);
    QuestionDetailComponent = QuestionDetailComponent_1 = __decorate([
        core_1.Component({
            selector: 'question-detail',
            templateUrl: './app/question/question-detail.component.html',
            styleUrls: ['./app/question/question-detail.component.css']
        }),
        __metadata("design:paramtypes", [])
    ], QuestionDetailComponent);
    return QuestionDetailComponent;
}());
exports.QuestionDetailComponent = QuestionDetailComponent;

//# sourceMappingURL=question-detail.component.js.map
