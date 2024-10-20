import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class AnswerInput {
  questionId: number;
  choiceId: number;
}
