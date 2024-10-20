import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Table,
} from 'sequelize-typescript';

import { BaseModel } from './base.model';
import { ObjectType } from '@nestjs/graphql';
import { User } from './user.model';

interface CreateQuizAttributes {
  ownerId: number;
  title: string;
  description: string | null;
  duration?: number | null;
}

@Table({ tableName: 'quizzes', timestamps: true })
@ObjectType()
export class Quiz extends BaseModel<Quiz, CreateQuizAttributes> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  ownerId!: number;

  @Column({ type: DataType.STRING })
  title!: string;

  @Column({ type: DataType.TEXT({ length: 'long' }), allowNull: true })
  description?: string | null;

  @BelongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  owner!: User;
}
