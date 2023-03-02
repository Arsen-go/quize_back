import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { Question } from './question.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

interface CreateUserAnswerAttributes {
  questionId: number;
  answer: number;
  userId: number;
}

@Table({ tableName: 'user_answers', timestamps: true })
@ObjectType()
export class UserAnswer extends Model<UserAnswer, CreateUserAnswerAttributes> {
  @Field(() => ID)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id!: number;

  @Field(() => ID)
  @ForeignKey(() => Question)
  @Column({ type: DataType.INTEGER })
  questionId!: number;

  @Field(() => Number)
  @Column({ type: DataType.INTEGER })
  answer: number;

  @Field(() => ID)
  @Column({ type: DataType.INTEGER })
  userId!: number;
}
