import { Component, OnInit } from "@angular/core";
import FeedService, { IQuestion } from "@app/core/feed.service";

@Component({
	selector: "qf-feed",
	templateUrl: "./feed.component.pug",
	styleUrls: ["./feed.component.scss"]
})
export class FeedComponent implements OnInit {
	questions: Array<IQuestion>;
	constructor(private feedService: FeedService) {}

	ngOnInit() {
		this.feedService
			.fetchQuestionAnswers()
			.subscribe((questions: Array<IQuestion>) => {
				this.questions = questions;
			});
	}
}
