import { InputType } from '@nestjs/graphql';
import { QuestionInput } from './question.input';

@InputType()
export class QuizInput {
  title: string;
  description: string;
  questions: QuestionInput[];
}
