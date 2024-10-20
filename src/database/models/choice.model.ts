import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Field, Float, ID, ObjectType } from '@nestjs/graphql';

import { Attachment } from './attachments.model';
import { BaseModel } from './base.model';
import { Question } from './question.model';
import { Quiz } from './quiz.model';

interface CreateChoiceAttributes {
  questionId: number;
  value: string;
  isCorrect: boolean;
  type: string;
  imageId?: number;
}

@Table({ tableName: 'choices', timestamps: true })
@ObjectType()
export class Choice extends BaseModel<Choice, CreateChoiceAttributes> {
  @ForeignKey(() => Question)
  @Column({ type: DataType.INTEGER })
  questionId!: number;

  @ForeignKey(() => Attachment) // TODO then this also can be many for further versions
  @Column({ type: DataType.INTEGER, allowNull: true })
  imageId?: number;

  @Column({ type: DataType.TEXT })
  value!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isCorrect: boolean;

  @Column({ type: DataType.STRING, defaultValue: '' })
  type!: string;

  @BelongsTo(() => Question)
  question!: Question;
}
