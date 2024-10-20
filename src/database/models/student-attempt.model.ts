import {
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';
import { Field, Float, ObjectType } from '@nestjs/graphql';

import { BaseModel } from './base.model';
import { Quiz } from './quiz.model';

interface CreateStudentAttemptAttributes {
  quizId: number;
  studentName: number;
  score: number;
}

@Table({ tableName: 'student_attempts', timestamps: true })
@ObjectType()
export class StudentAttempt extends BaseModel<
  StudentAttempt,
  CreateStudentAttemptAttributes
> {
  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER })
  quizId!: number;

  @Column({ type: DataType.STRING })
  studentName!: string;

  @Field(() => Float)
  @Column({ type: DataType.FLOAT, defaultValue: 0 })
  score!: number;
}
