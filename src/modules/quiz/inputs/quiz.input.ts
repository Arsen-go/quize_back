import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@InputType()
class QuestionInput {
  @Field(() => String)
  questionText!: string;

  @Field(() => [String])
  options!: string[];

  @Field(() => Number)
  correctAnswer!: number;
}

@InputType()
export class QuizInput {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  description!: string;

  @Field(() => [QuestionInput])
  questions!: QuestionInput[];
}

@InputType()
export class QuizUpdateInput {
  @Field(() => String, { nullable: true })
  name: string | null;

  @Field(() => String, { nullable: true })
  description: string | null;
}
