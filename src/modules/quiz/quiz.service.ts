import { Quiz } from '@/core/database/models/quiz.model';
import { Injectable } from '@nestjs/common';
import { QuizInput } from './inputs/quiz.input';

@Injectable()
export class QuizService {
  async findAll(): Promise<Quiz[]> {
    return Quiz.findAll({ include: [{ all: true }] });
  }

  async findOne(id: number): Promise<Quiz | null> {
    return Quiz.findByPk(id, { include: [{ all: true }] });
  }

  async create(data: QuizInput): Promise<Quiz> {
    return Quiz.create(data);
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
}
