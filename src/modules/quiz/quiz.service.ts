import { AnswerQuizInput } from './inputs/answer-quiz.input';
import { Choice } from '@/database/models/choice.model';
import { Injectable } from '@nestjs/common';
import { Question } from '@/database/models/question.model';
import { Quiz } from '@/database/models/quiz.model';
import { QuizInput } from './inputs/quiz.input';
import { RandomQuizType } from '@/constants/enums';
import { Transaction } from 'sequelize';
import { User } from '@/database/models/user.model';

const fs = require('fs');

@Injectable()
export class QuizService {
  async createQuiz({
    quizInput: { description, questions, title },
    user,
    transaction,
  }: {
    quizInput: QuizInput;
    user: User;
    transaction: Transaction;
  }): Promise<Quiz> {
    const quiz: Quiz = await Quiz.create(
      {
        title,
        description,
        ownerId: user.id,
        category: 'MATH', // TODO quiz categories
      },
      { transaction },
    );

    // Iterate over the questions and save them
    for (const { choices, text, imageId } of questions) {
      const question: Question = await Question.create(
        {
          text,
          imageId,
          quizId: quiz.id,
        },
        { transaction },
      );

      // Iterate over the choices and save them
      for (const { value, imageId } of choices) {
        await Choice.create(
          {
            value,
            imageId,
            questionId: question.id,
          },
          { transaction },
        );
      }
    }

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
      title: quiz.title,
      ownerId: user.id,
    });

    // await Question.bulkCreate(
    //   quiz.questions.map((q) => ({
    //     correctAnswer: q.correctAnswer,
    //     options: q.options,
    //     questionText: q.questionText,
    //     quizId: newQuiz.id,
    //   })),
    // );

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

    // await AnsweredUser.create({ quizId, score, userName });

    return score;
  }

  // async updateQuiz({
  //   data,
  //   id,
  // }: {
  //   data: QuizUpdateInput;
  //   id: number;
  // }): Promise<Quiz | null> {
  //   const quiz: Quiz = await Quiz.findByPk(id);
  //   if (!quiz) return null;

  //   const { description, name } = data;

  //   const entity: any = {};
  //   if (name) entity.name = name;
  //   if (description) entity.description = description;

  //   await quiz.update(entity);

  //   return quiz;
  // }

  async delete({ id }: { id: number }): Promise<boolean> {
    const quiz: Quiz = await Quiz.findByPk(id);
    if (!quiz) return false;

    await quiz.destroy();

    return true;
  }

  async getUserQuizzes({ user }: { user: User }): Promise<Quiz[]> {
    return Quiz.findAll({ where: { ownerId: user.id } });
  }

  async findOne(id: number): Promise<Quiz | null> {
    return Quiz.findByPk(id, { include: [{ all: true }] });
  }

  async getAnsweredUsers({ quizId }: { quizId: number }): Promise<string[]> {
    return ['us1', 'us2'];
  }

  async getQuizQuestions({ quizId }: { quizId: number }): Promise<Question[]> {
    return Question.findAll({ where: { quizId } });
  }
}
