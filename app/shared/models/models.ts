export class QuestionCategory {
    title: string;
    questions: Question[];
}
export class Question {
    id: number;
    index: number;
    title: string;
    answered: boolean;
    type: string;
    difficulty: number;
    answers: Answer[];
}
export class Answer {
    title: string;
    url?: string;
    correct?: boolean;
    fifty?: boolean;
    choosen: boolean;
}
