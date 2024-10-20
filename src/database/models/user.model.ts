import { BaseModel } from './base.model';
import { BeforeCreate, Column, DataType, Table } from 'sequelize-typescript';
import { Field, ObjectType } from '@nestjs/graphql';
import { generateRandomString } from '@/guards/utils/generate-random-string';
import * as bcrypt from 'bcryptjs';

interface CreateUserAttr {
  email: string;
  password: string;
  name?: string;
}

@Table({
  tableName: 'users',
  indexes: [
    {
      name: 'idx_user_name',
      fields: ['name'],
      unique: true,
    },
    {
      name: 'idx_user_email',
      fields: ['email'],
      unique: true,
    },
  ],
})
@ObjectType()
export class User extends BaseModel<User, CreateUserAttr> {
  @Field(() => String)
  @Column({
    type: DataType.STRING,
    unique: true,
    comment: 'Every user must have one account.',
  })
  email: number;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    defaultValue: generateRandomString(10),
    comment: 'This is the user nickname and will be unique',
  })
  name: string;

  @Column({ type: DataType.STRING })
  password: string;

  @BeforeCreate
  static hashPassword(instance: User) {
    const hashedPassword = bcrypt.hashSync(instance.password, 10);
    instance.password = hashedPassword;
  }

  async checkPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
