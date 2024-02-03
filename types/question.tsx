export interface Question {
  result_answers: {
    tag: string;
    id: number;
    question_id: number;
    next_question_id: number;
  }[];
  content: string;
  id: number;
}

export interface AnsweredData {
  id: number;
  next_question_id: number;
  current_question_id: number;
}
