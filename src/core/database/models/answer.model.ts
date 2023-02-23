import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Question } from './question.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Table({ timestamps: true })
@ObjectType()
export class Answer extends Model<Answer> {
  @Field(() => ID)
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Field(() => String)
  @Column
  answer: string;

  @Field(() => Number)
  @Column
  userId!: number;

  @ForeignKey(() => Question)
  @Column
  questionId!: number;
}
