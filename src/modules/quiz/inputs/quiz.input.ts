import { InputType } from '@nestjs/graphql';

@InputType()
class QuestionInput {
  questionText!: string;
  options!: string[];
  correctAnswer!: number;
}

@InputType()
export class QuizInput {
  name!: string;
  description!: string;
  questions!: QuestionInput[];
}

@InputType()
export class QuizUpdateInput {
  name?: string | null;
  description?: string | null;
}
