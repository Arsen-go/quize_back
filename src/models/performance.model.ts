import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PerformanceModel {
  queryCount?: number;
}
