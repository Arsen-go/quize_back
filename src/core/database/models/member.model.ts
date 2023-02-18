import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { DEFAULT_COLOR } from '@/constants';

interface CreateMemberAttr {
  userId: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  online: boolean;
  color: string;
}

@Table({
  tableName: 'members',
})
@ObjectType()
export class Member extends BaseModel<Member, CreateMemberAttr> {
  @Field()
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Field()
  @Column({ type: DataType.STRING })
  firstName: string;

  @Field()
  @Column({ type: DataType.STRING })
  lastName: string;

  @Field()
  @Column({ type: DataType.STRING })
  emailAddress: string;

  @Field(() => Boolean, { nullable: true })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  online: boolean;

  @Field(() => String)
  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: DEFAULT_COLOR,
  })
  color: string;

  @Field(() => Boolean, { nullable: true })
  isShared: boolean;
}
