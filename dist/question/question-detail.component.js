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
    }
    QuestionDetailComponent.prototype.ngOnInit = function () {
    };
    QuestionDetailComponent.prototype.evaluateOthers = function (correct) {
        if (correct) {
            this.questionAnswered.emit({ question: this.question, correct: true, groupSwitched: this.groupSwitched });
            return;
        }
        if (this.groupSwitched || this.question.jokerInUse) {
            this.questionAnswered.emit({ question: this.question, correct: false, groupSwitched: this.groupSwitched });
            return;
        }
        this.solutionVisible = false;
        this.groupSwitched = true;
        this.switchGroup.emit();
    };
    QuestionDetailComponent.prototype.evaluateChoose = function (answer) {
        if (answer.correct) {
            this.questionAnswered.emit({ question: this.question, correct: true, groupSwitched: this.groupSwitched });
            return;
        }
        if (this.groupSwitched || this.question.jokerInUse) {
            this.questionAnswered.emit({ question: this.question, correct: false, groupSwitched: this.groupSwitched });
            return;
        }
        answer.choosen = true;
        this.groupSwitched = true;
        this.switchGroup.emit();
    };
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
    QuestionDetailComponent = __decorate([
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
