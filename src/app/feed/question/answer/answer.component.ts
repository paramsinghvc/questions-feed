import { Component, OnInit, Input } from "@angular/core";
import { IAnswer } from "@app/core/feed.service";

@Component({
	selector: "qf-answer",
	templateUrl: "./answer.component.pug",
	styleUrls: ["./answer.component.scss"]
})
export class AnswerComponent implements OnInit {
	@Input() answer: IAnswer;
	constructor() {}

	ngOnInit() {}
}
