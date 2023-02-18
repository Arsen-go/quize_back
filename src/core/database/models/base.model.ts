import { Field, ObjectType } from '@nestjs/graphql';
import { Column, DataType, Model } from 'sequelize-typescript';

@ObjectType()
export class BaseModel<T, G> extends Model<T, G> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  id: number;

  @Field()
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @Field()
  @Column({ type: DataType.DATE })
  updatedAt: Date;

  queryCount: number;
}
