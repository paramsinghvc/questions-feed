import { Component, OnInit, Input } from "@angular/core";
import { IQuestion } from "@app/core/feed.service";
@Component({
	selector: "qf-question",
	templateUrl: "./question.component.pug",
	styleUrls: ["./question.component.scss"]
})
export class QuestionComponent implements OnInit {
	@Input() question: IQuestion;
	answerToBePosted = "";
	constructor() {}

	ngOnInit() {}

	postAnswer() {
		if (!this.answerToBePosted) {
			return;
		}
		this.question.answers.unshift({
			id: "" + Math.random() * 10,
			text: this.answerToBePosted,
			createdAt: "" + new Date(),
			createdBy: "Param Singh",
			downvotes: 0,
			upvotes: 0,
			questionId: this.question.id
		});
		this.answerToBePosted = "";
	}

	voteUp(inc: boolean) {
		if (inc) {
			this.question.upvotes++;
		} else {
			this.question.downvotes++;
		}
	}
}
