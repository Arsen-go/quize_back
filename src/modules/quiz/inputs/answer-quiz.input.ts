import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AnswerQuizInput {
  quizId: number;
  score: number;
  userName: string;
  answers: number[];
}
