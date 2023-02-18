import { Field, InputType } from '@nestjs/graphql';
import { OwnershipTypeEnum } from '@/constants/enums';

@InputType()
export class FilterInput {
  @Field(() => OwnershipTypeEnum)
  ownership: OwnershipTypeEnum;
}
