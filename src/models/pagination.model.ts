import { Field, ObjectType } from '@nestjs/graphql';
import { PerformanceModel } from './performance.model';

@ObjectType()
export class PaginationModel extends PerformanceModel {
  @Field()
  limit: number;

  @Field()
  offset: number;

  @Field()
  count?: number;
}
