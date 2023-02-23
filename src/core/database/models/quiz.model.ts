import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Question } from './question.model';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Table({ tableName: 'quizzes', timestamps: true })
@ObjectType()
export class Quiz extends Model<Quiz> {
  @Field(() => ID)
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  name!: string;

  @Field(() => String)
  @Column({ type: DataType.STRING })
  description!: string;

  @Field(() => String)
  @Column({ type: DataType.INTEGER })
  duration: number;

  @HasMany(() => Question)
  questions!: Question[];
}
