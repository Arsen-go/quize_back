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
  userName: string;
  score: number;
}

@Table({ tableName: 'answered_users', timestamps: true })
@ObjectType()
export class AnsweredUser extends Model<AnsweredUser, CreateResultAttributes> {
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

  @Field(() => Number)
  @Column({ type: DataType.INTEGER })
  score!: number;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  userName!: string;

  @Field(() => String)
  createdAt: Date;
}
