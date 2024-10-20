import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';

import { BaseModel } from './base.model';
import { Choice } from './choice.model';
import { ObjectType } from '@nestjs/graphql';
import { Question } from './question.model';
import { StudentAttempt } from './student-attempt.model';

interface CreateAttemptAnswerAttributes {
  studentAttemptId: number;
  questionId: number;
  choiceId: number;
}

@Table({ tableName: 'attempt_answers', timestamps: true })
@ObjectType()
export class AttemptAnswer extends BaseModel<
  AttemptAnswer,
  CreateAttemptAnswerAttributes
> {
  @ForeignKey(() => StudentAttempt)
  @Column({ type: DataType.INTEGER })
  studentAttemptId!: number;

  @ForeignKey(() => Question)
  @Column({ type: DataType.INTEGER })
  questionId!: number;

  @ForeignKey(() => Choice)
  @Column({ type: DataType.INTEGER })
  choiceId!: number;
}
