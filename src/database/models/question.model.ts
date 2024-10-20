import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from './base.model';
import { ObjectType } from '@nestjs/graphql';
import { Quiz } from './quiz.model';

interface CreateQuestionAttributes {
  text: string;
  quizId: number;
}

// ! -> variable or property is non-null

@Table({ tableName: 'questions', timestamps: true })
@ObjectType()
export class Question extends BaseModel<Question, CreateQuestionAttributes> {
  @Column({ type: DataType.STRING })
  text!: string;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER })
  quizId!: number;

  @BelongsTo(() => Quiz, { foreignKey: 'quizId' })
  quiz!: Quiz;
}
