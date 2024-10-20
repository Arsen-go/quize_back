import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';

import { Attachment } from './attachments.model';
import { BaseModel } from './base.model';
import { ObjectType } from '@nestjs/graphql';
import { Quiz } from './quiz.model';

interface CreateQuestionAttributes {
  text: string;
  quizId: number;
  imageId?: number;
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

  @ForeignKey(() => Attachment)
  @Column({ type: DataType.INTEGER, allowNull: true })
  imageId?: number;

  @BelongsTo(() => Quiz, { foreignKey: 'quizId' })
  quiz!: Quiz;

  @HasOne(() => Attachment, { sourceKey: 'imageId', foreignKey: 'id' })
  image?: Attachment;
}
