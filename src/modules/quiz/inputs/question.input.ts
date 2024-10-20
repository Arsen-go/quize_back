import { Field, InputType } from '@nestjs/graphql';

import { ChoiceInput } from './choice.input';

@InputType()
export class QuestionInput {
  text: string;
  choices: ChoiceInput[];
  imageId?: number;
}
