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

interface CreateResultAttributes {
  quizId: number;
  userId: number;
  score: number;
}

@Table({ tableName: 'results', timestamps: true })
@ObjectType()
export class Result extends Model<Result, CreateResultAttributes> {
  @Field(() => ID)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER })
  quizId!: number;

  @Field(() => Quiz)
  @BelongsTo(() => Quiz)
  quiz!: Quiz;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId!: number;

  @Field(() => User)
  @BelongsTo(() => User)
  user!: User;

  @Field(() => Number)
  @Column({ type: DataType.INTEGER })
  score!: number;
}
