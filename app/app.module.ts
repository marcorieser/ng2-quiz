import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpModule} from "@angular/http";
import {QuestionService} from "./shared/service/question.service";
import {QuestionComponent} from "./question/question.component";
import {QuestionDetailComponent} from "./question/question-detail.component";

@NgModule({
    imports: [BrowserModule, HttpModule],
    declarations: [AppComponent, QuestionComponent, QuestionDetailComponent],
    providers: [QuestionService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
