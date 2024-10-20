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

interface CreateQuestionAttributes {
  questionText: string;
  options: string[];
  correctAnswer: number;
  quizId: number;
}

// ! -> variable or property is non-null

@Table({ tableName: 'questions', timestamps: true })
@ObjectType()
export class Question extends Model<Question, CreateQuestionAttributes> {
  @Field(() => ID)
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id!: number;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  questionText!: string;

  @Field(() => [String])
  @Column({ type: DataType.JSON })
  options!: string[];

  @Field(() => Number)
  @Column({ type: DataType.INTEGER })
  correctAnswer!: number;

  @Field(() => Number)
  @ForeignKey(() => Quiz)
  @Column({ type: DataType.INTEGER })
  quizId!: number;

  @BelongsTo(() => Quiz, {
    foreignKey: 'quizId',
  })
  quiz!: Quiz;
}
