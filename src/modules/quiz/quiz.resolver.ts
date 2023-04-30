import { Quiz } from '@/core/database/models/quiz.model';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { QuizInput, QuizUpdateInput } from './inputs/quiz.input';
import { QuizService } from './quiz.service';
import { User } from '@/core/database/models/user.model';
import { Question } from '@/core/database/models/question.model';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import { AnswerQuizInput } from './inputs/answer-quiz.input';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private quizService: QuizService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Quiz])
  async getUserQuizzes(@CurrentUser() user: User): Promise<Quiz[]> {
    return this.quizService.getUserQuizzes({ user });
  }

  @Query(() => Quiz)
  async quiz(@Args('id') id: number): Promise<Quiz | null> {
    return this.quizService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Quiz)
  async createQuiz(
    @CurrentUser() user: User,
    @Args('data') data: QuizInput,
  ): Promise<Quiz> {
    return this.quizService.create({ data, user });
  }

  @Mutation(() => Number)
  async answerQuiz(
    @CurrentUser() user: User,
    @Args('answerInput') answerInput: AnswerQuizInput,
  ): Promise<number> {
    return this.quizService.answerQuiz({ answerInput, user });
  }

  @Mutation(() => Quiz)
  async updateQuiz(
    @Args('id') id: number,
    @Args('data') data: QuizUpdateInput,
  ): Promise<Quiz | null> {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) return null;

    const { description, name } = data;

    const entity: any = {};
    if (name) entity.name = name;
    if (description) entity.description = description;

    await quiz.update(entity);

    return quiz;
  }

  @Mutation(() => Boolean)
  async deleteQuiz(@Args('id') id: number): Promise<boolean> {
    console.log(
      '🚀 ~ file: quiz.resolver.ts:63 ~ QuizResolver ~ deleteQuiz ~ id:',
      id,
    );
    const quiz = await Quiz.findByPk(id);
    if (!quiz) return false;

    await quiz.destroy();
    return true;
  }

  @ResolveField(() => [Question])
  async questions(@Parent() quiz: Quiz): Promise<Question[]> {
    return this.quizService.getQuizQuestions({ quizId: quiz.id });
  }
}
