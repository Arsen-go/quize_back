import { Module } from '@nestjs/common';
import { QuizResolver } from './quiz.resolver';
import { QuizService } from './quiz.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [QuizResolver, QuizService, JwtService],
  exports: [QuizService],
})
export class QuizModule {}
