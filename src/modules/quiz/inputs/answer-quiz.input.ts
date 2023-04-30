import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AnswerQuizInput {
  @Field(() => ID)
  quizId: number;

  @Field(() => Number)
  score: number;

  @Field(() => String)
  userName: string;

  @Field(() => [Number])
  answers: number[];
}
