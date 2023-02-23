import { Quiz } from '@/core/database/models/quiz.model';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { QuizInput } from './inputs/quiz.input';
import { QuizService } from './quiz.service';
import { User } from '@/core/database/models/user.model';

@Resolver(() => Quiz)
export class QuizResolver {
  constructor(private quizService: QuizService) {}

  @Query(() => [Quiz])
  async quizzes(): Promise<Quiz[]> {
    return this.quizService.findAll();
  }

  @Query(() => Quiz)
  async quiz(@Args('id') id: number): Promise<Quiz | null> {
    return this.quizService.findOne(id);
  }

  @Mutation(() => User)
  async createQuiz(@Args('data') data: QuizInput): Promise<Quiz> {
    return this.quizService.create(data);
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
}
