


export type JsonParsedModel = {
    id: string,
    categoryName: string,
    quesionsAndAnswers: QuestionAndAnswerModel[] 
};


export type QuestionAndAnswerModel = {

    Q: string;
    A: string;
    score: number;
    identifier: string;
}


