import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class PaginationInput {
  @Field()
  limit: number;

  @Field()
  offset: number;
}
