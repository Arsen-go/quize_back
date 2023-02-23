import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class QuizInput {
  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field()
  duration!: number;
}
