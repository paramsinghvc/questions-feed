import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FeedComponent } from "./feed.component";
import { QuestionDetailComponent } from "./question-detail/question-detail.component";

const routes: Routes = [
	{
		path: "feed",
		component: FeedComponent
	},
	{
		path: "feed/question/:id",
		component: QuestionDetailComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export default class FeedRoutingModule {}
