import {
  Table,
  Column,
  Model,
  HasMany,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

interface CreateQuizAttributes {
  ownerId: number;
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

  @Field(() => Number)
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  ownerId!: number;

  @BelongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  owner!: User;

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
