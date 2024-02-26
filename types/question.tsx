import {Car} from '.';

export interface ApiResponseQuestion {
  u_id?: any;
  bottom_limit: number;
  top_limit: number;
  question: {content: string; id: number};
  choices: Choice[];
  recommendations: Car[];
}

export interface Question {
  data: {
    content: string;
    id: number;
  };
  choices: Choice[];
}

export interface Choice {
  answer_id: number;
  tag: string;
  tag_id: number;
}

export interface AnsweredData {
  id: number;
  content: string;
  choices: Choice[];
  answer_id: number;
  tag: string;
}
