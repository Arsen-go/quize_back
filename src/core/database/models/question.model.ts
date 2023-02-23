import {
  Table,
  Column,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
  DataType,
} from 'sequelize-typescript';
import { Quiz } from './quiz.model';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@Table({ timestamps: true })
@ObjectType()
export class Question extends Model<Question> {
  @Field(() => ID)
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  text!: string;

  @Field(() => [String])
  @Column({ type: DataType.STRING })
  options!: string[];

  @Field(() => String)
  @Column({ type: DataType.STRING })
  correctAnswer!: string;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER })
  quizId!: number;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;
}
