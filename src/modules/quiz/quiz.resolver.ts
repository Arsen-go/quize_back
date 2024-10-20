import { Quiz } from '@/database/models/quiz.model';
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
import { User } from '@/database/models/user.model';
import { Question } from '@/database/models/question.model';
import { CurrentUser } from '@/decorators/current-user.decorator';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import { AnswerQuizInput } from './inputs/answer-quiz.input';
import { RandomQuizType } from '@/constants/enums';
import { TransactionInterceptor } from '@/interceptors/transaction.interceptor';
import { TransactionParam } from '@/decorators/transaction.decorator';
import { Transaction } from 'sequelize';

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

  // @Query(() => [AnsweredUser])
  // async answeredUsers(@Args('quizId') quizId: number): Promise<AnsweredUser[]> {
  //   return this.quizService.getAnsweredUsers({ quizId });
  // }

  @UseGuards(AuthGuard)
  @UseInterceptors(TransactionInterceptor)
  @Mutation(() => Quiz)
  async createQuiz(
    @CurrentUser() user: User,
    @Args('quizInput') quizInput: QuizInput,
    @TransactionParam() transaction: Transaction,
  ): Promise<Quiz> {
    return this.quizService.createQuiz({ quizInput, user, transaction });
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Quiz)
  async createRandomQuiz(
    @CurrentUser() user: User,
    @Args('type', {
      type() {
        return RandomQuizType;
      },
    })
    type: RandomQuizType,
  ): Promise<Quiz> {
    return this.quizService.createRandomQuiz({ type, user });
  }

  @Mutation(() => Number)
  async answerQuiz(
    @CurrentUser() user: User,
    @Args('answerInput') answerInput: AnswerQuizInput,
  ): Promise<number> {
    return this.quizService.answerQuiz({ answerInput, user });
  }

  // @Mutation(() => Quiz, { nullable: true })
  // async updateQuiz(
  //   @Args('id') id: number,
  //   @Args('data') data: QuizUpdateInput,
  // ): Promise<Quiz | null> {
  //   return this.quizService.updateQuiz({ data, id });
  // }

  @Mutation(() => Boolean)
  async deleteQuiz(@Args('id') id: number): Promise<boolean> {
    return this.quizService.delete({ id });
  }

  @ResolveField(() => [Question])
  async questions(@Parent() quiz: Quiz): Promise<Question[]> {
    return this.quizService.getQuizQuestions({ quizId: quiz.id });
  }
}
