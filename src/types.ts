export type AnswerOption = {
  id: number;
  text: string;
};

export type Question = {
  id: number;
  text: string;
  options: AnswerOption[];
  correctId: number;
};
