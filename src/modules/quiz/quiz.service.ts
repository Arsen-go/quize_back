import { Quiz } from '@/core/database/models/quiz.model';
import { Injectable } from '@nestjs/common';
import { QuizInput } from './inputs/quiz.input';
import { Question } from '@/core/database/models/question.model';
import { User } from '@/core/database/models/user.model';
import { AnswerQuizInput } from './inputs/answer-quiz.input';
import { AnsweredUser } from '@/core/database/models/answered-user.model';

@Injectable()
export class QuizService {
  async create({ data, user }: { data: QuizInput; user: User }): Promise<Quiz> {
    const { description, name, questions } = data;

    const quiz: Quiz = await Quiz.create({
      description,
      name,
      ownerId: user.id,
    });

    await Question.bulkCreate(
      questions.map((q) => ({
        correctAnswer: q.correctAnswer,
        options: q.options,
        questionText: q.questionText,
        quizId: quiz.id,
      })),
    );

    return quiz;
  }

  async answerQuiz({
    answerInput,
    user,
  }: {
    answerInput: AnswerQuizInput;
    user: User;
  }): Promise<number> {
    const { answers, quizId, userName, score } = answerInput;

    await AnsweredUser.create({ quizId, score, userName });

    return score;
  }

  async update(id: number, data: QuizInput): Promise<Quiz | null> {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) return null;

    await quiz.update(data);
    return quiz;
  }

  async delete(id: number): Promise<boolean> {
    const quiz = await Quiz.findByPk(id);
    if (!quiz) return false;

    await quiz.destroy();
    return true;
  }

  async getUserQuizzes({ user }): Promise<Quiz[]> {
    console.log(user);
    return Quiz.findAll({ include: [{ all: true }] });
  }

  async findOne(id: number): Promise<Quiz | null> {
    return Quiz.findByPk(id, { include: [{ all: true }] });
  }

  async getAnsweredUsers({
    quizId,
  }: {
    quizId: number;
  }): Promise<AnsweredUser[]> {
    return AnsweredUser.findAll({
      where: {
        quizId,
      },
    });
  }

  async getQuizQuestions({ quizId }: { quizId: number }): Promise<Question[]> {
    return Question.findAll({ where: { quizId } });
  }
}
