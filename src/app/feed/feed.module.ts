import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import FeedRoutingModule from "./feed-routing.module";
import { MaterialModule } from "@blox/material";
import { FormsModule } from "@angular/forms";

import { FeedComponent } from "./feed.component";
import { QuestionComponent } from "./question/question.component";
import { AnswerComponent } from "./question/answer/answer.component";
import { QuestionDetailComponent } from './question-detail/question-detail.component';

@NgModule({
	declarations: [FeedComponent, QuestionComponent, AnswerComponent, QuestionDetailComponent],
	imports: [CommonModule, FeedRoutingModule, MaterialModule, FormsModule]
})
export class FeedModule {}
