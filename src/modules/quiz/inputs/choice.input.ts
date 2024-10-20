import { InputType } from '@nestjs/graphql';

@InputType()
export class ChoiceInput {
  value: string;
  imageId?: number;
}
