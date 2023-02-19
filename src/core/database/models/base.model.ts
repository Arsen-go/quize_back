import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model } from 'sequelize-typescript';

@ObjectType()
export class BaseModel<T, G> extends Model<T, G> {
  @Field(() => Number, {
    nullable: false,
    description: 'Unique identifier for this model.',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Field(() => Date, {
    description: 'This is the date when this model is created.',
    nullable: false,
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date(),
  })
  createdAt: Date;

  @Field(() => Date, {
    description:
      'Every action with this model will cause a change of this value',
    nullable: false,
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: new Date(),
  })
  updatedAt: Date;
}
