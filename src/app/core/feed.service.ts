import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { combineLatest } from "rxjs";

export interface IQuestion {
	id: string;
	text: string;
	upvotes: number;
	downvotes: number;
	answers: Array<IAnswer>;
}

export interface IAnswer {
	id: string;
	text: string;
	createdAt: string;
	createdBy: string | IPerson;
	upvotes: number;
	downvotes: number;
	questionId: string;
}

export interface IPerson {
	avatar: string;
	id: string;
	name: string;
	surname: string;
}

interface IQuestionAnswer {
	questions: Array<IQuestion>;
	answers: Array<IAnswer>;
}

const API_PREFIX = "https://api.myjson.com/bins/";

@Injectable({
	providedIn: "root"
})
export default class FeedService {
	questions: Array<IQuestion>;

	constructor(private http: HttpClient) {}

	constructQuestion = (obj: any) => ({
		id: obj.Id,
		text: obj.Text,
		downvotes: obj.downvotes || 0,
		upvotes: obj.upvotes || 0
	});

	constructPerson = (person: any) => {
		if (!person) {
			return "Anonymous";
		}
		if (typeof person === "string") {
			return person;
		}
		return {
			avatar: person.Avatar,
			id: person.Id,
			name: person.Name,
			surname: person.Surname
		};
	};

	constructAnswer = (obj: any) => ({
		id: obj.Id,
		text: obj.Answer,
		createdAt: obj.created_at,
		createdBy: this.constructPerson(obj.created_by),
		downvotes: obj.downvotes || 0,
		upvotes: obj.upvotes || 0,
		questionId: obj["Question-Id"]
	});

	fetchQuestions = () =>
		this.http
			.get(`${API_PREFIX}dck5b`)
			.pipe(
				map((res: any) =>
					res.feed_questions.map((_q: any) =>
						this.constructQuestion(_q)
					)
				)
			);

	fetchAnswers = () =>
		this.http
			.get(`${API_PREFIX}hildr`)
			.pipe(
				map((res: any) =>
					res.feed_answers.map((_q: any) => this.constructAnswer(_q))
				)
			);

	fetchQuestionAnswers = () => {
		const questions$ = this.fetchQuestions();
		const answers$ = this.fetchAnswers();

		return combineLatest(questions$, answers$, (_q, _a) => ({
			questions: _q,
			answers: _a
		})).pipe(
			map(({ questions, answers }: IQuestionAnswer) =>
				questions.map((q: IQuestion) => ({
					...q,
					answers: answers
						.filter(a => a.questionId === q.id)
						.map((a, i) => ({
							...a,
							createdAt: `12/Apr/18 13:3${i}`
						}))
						.sort((a: IAnswer, b: IAnswer) =>
							new Date(a.createdAt) > new Date(b.createdAt)
								? -1
								: 1
						)
				}))
			),
			tap((value: Array<IQuestion>) => {
				this.questions = value;
			})
		);
	};

	getQuestionFromId(qId: string) {
		return this.questions.find((q: IQuestion) => q.id === qId);
	}
}
