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
import { User } from './user.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Table({ timestamps: true })
@ObjectType()
export class Result extends Model<Result> {
  @Field(() => ID)
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER })
  quizId!: number;

  @BelongsTo(() => Quiz)
  quiz!: Quiz;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @Field()
  @Column({ type: DataType.INTEGER })
  score!: number;
}
