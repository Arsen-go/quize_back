import { Quiz } from '@/core/database/models/quiz.model';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { QuizInput } from './inputs/quiz.input';
import { QuizService } from './quiz.service';
import { User } from '@/core/database/models/user.model';
import { Question } from '@/core/database/models/question.model';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';

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

  @Mutation(() => Quiz)
  async updateQuiz(
    @Args('id') id: number,
    @Args('data') data: QuizInput,
  ): Promise<Quiz | null> {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) return null;

    await quiz.update(data);
    return quiz;
  }

  @Mutation(() => Boolean)
  async deleteQuiz(@Args('id') id: number): Promise<boolean> {
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
