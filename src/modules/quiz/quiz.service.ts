import { Quiz } from '@/core/database/models/quiz.model';
import { Injectable } from '@nestjs/common';
import { QuizInput, QuizUpdateInput } from './inputs/quiz.input';
import { Question } from '@/core/database/models/question.model';
import { User } from '@/core/database/models/user.model';
import { AnswerQuizInput } from './inputs/answer-quiz.input';
import { AnsweredUser } from '@/core/database/models/answered-user.model';
import { RandomQuizType } from '@/constants/enums';
const fs = require('fs');

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

  async createRandomQuiz({
    type,
    user,
  }: {
    type: RandomQuizType;
    user: User;
  }): Promise<Quiz> {
    let quiz: QuizInput;
    let data: any;
    let quizzes: any;
    switch (type) {
      case RandomQuizType.C_PLUS_PLUS:
        data = fs.readFileSync('src/constants/json/cPlusPlus.quiz.json', {
          encoding: 'utf8',
        });
        quizzes = JSON.parse(data);

        quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        break;
      case RandomQuizType.DISCRETE:
        data = fs.readFileSync('src/constants/json/discrete.quiz.json', {
          encoding: 'utf8',
        });
        quizzes = JSON.parse(data);

        quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        break;
      case RandomQuizType.PYTHON:
        data = fs.readFileSync('src/constants/json/python.quiz.json', {
          encoding: 'utf8',
        });
        quizzes = JSON.parse(data);

        quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        break;
      case RandomQuizType.ASSEMBLY:
        data = fs.readFileSync('src/constants/json/assembly.quiz.json', {
          encoding: 'utf8',
        });
        quizzes = JSON.parse(data);

        quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        break;
      case RandomQuizType.DATA_SCIENCE:
        data = fs.readFileSync('src/constants/json/data-science.quiz.json', {
          encoding: 'utf8',
        });
        quizzes = JSON.parse(data);

        quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
        break;
      default:
        break;
    }

    const newQuiz: Quiz = await Quiz.create({
      description: quiz.description,
      name: quiz.name,
      ownerId: user.id,
    });

    await Question.bulkCreate(
      quiz.questions.map((q) => ({
        correctAnswer: q.correctAnswer,
        options: q.options,
        questionText: q.questionText,
        quizId: newQuiz.id,
      })),
    );

    return newQuiz;
  }

  async answerQuiz({
    answerInput,
    user,
  }: {
    answerInput: AnswerQuizInput;
    user: User;
  }): Promise<number> {
    // TODO
    const { answers, quizId, userName, score } = answerInput;

    await AnsweredUser.create({ quizId, score, userName });

    return score;
  }

  async updateQuiz({
    data,
    id,
  }: {
    data: QuizUpdateInput;
    id: number;
  }): Promise<Quiz | null> {
    const quiz: Quiz = await Quiz.findByPk(id);
    if (!quiz) return null;

    const { description, name } = data;

    const entity: any = {};
    if (name) entity.name = name;
    if (description) entity.description = description;

    await quiz.update(entity);

    return quiz;
  }

  async delete({ id }: { id: number }): Promise<boolean> {
    const quiz: Quiz = await Quiz.findByPk(id);
    if (!quiz) return false;

    await quiz.destroy();

    return true;
  }

  async getUserQuizzes({ user }): Promise<Quiz[]> {
    // TODO
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
      order: [['score', 'DESC']],
    });
  }

  async getQuizQuestions({ quizId }: { quizId: number }): Promise<Question[]> {
    return Question.findAll({ where: { quizId } });
  }
}
