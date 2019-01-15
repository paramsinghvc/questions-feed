import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import FeedService, { IQuestion } from "@app/core/feed.service";

@Component({
	selector: "qf-question-detail",
	templateUrl: "./question-detail.component.pug",
	styleUrls: ["./question-detail.component.scss"]
})
export class QuestionDetailComponent implements OnInit {
	question: IQuestion;

	constructor(
		private route: ActivatedRoute,
		private feedService: FeedService
	) {}

	ngOnInit() {
		const qId = this.route.snapshot.paramMap.get("id");
		this.question = this.feedService.getQuestionFromId(qId);
	}
}
