export class QuestionCategory {
    title: string;
    questions: Question[];
}

export class Question {
    id: number;
    index: number;
    title: string;
    tile: string = '';
    answered: boolean;
    type: string;
    difficulty: number;
    answers: Answer[];
    jokerInUse: boolean = false;
}

export class Answer {
    title: string;
    url?: string;
    correct?: boolean;
    fifty?: boolean;
    choosen: boolean;
}

export class Group {
    "name": string;
    "score": number;
    "fifty": number;
    "phone": number;
}
