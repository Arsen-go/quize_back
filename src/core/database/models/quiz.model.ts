import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import { Field, ID, ObjectType } from '@nestjs/graphql';

interface CreateQuizAttributes {
  name: string;
  description: string | null;
  duration?: number | null;
}

@Table({ tableName: 'quizzes', timestamps: true })
@ObjectType()
export class Quiz extends Model<Quiz, CreateQuizAttributes> {
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
  name!: string;

  @Field(() => String, { nullable: true })
  @Column({ type: DataType.STRING, allowNull: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  @Column({ type: DataType.INTEGER, allowNull: true })
  duration?: number | null;
}
