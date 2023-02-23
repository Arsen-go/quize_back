import { Module } from '@nestjs/common';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';

@Module({
  providers: [QuizResolver, QuizService],
  exports: [QuizService],
})
export class QuizModule {}
