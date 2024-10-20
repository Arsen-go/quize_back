import { Column, DataType, Table } from 'sequelize-typescript';

import { BaseModel } from './base.model';
import { ObjectType } from '@nestjs/graphql';

interface CreateAttachmentAttributes {
  url: string;
  name?: string;
}

@Table({ tableName: 'attachments', timestamps: true })
@ObjectType()
export class Attachment extends BaseModel<
  Attachment,
  CreateAttachmentAttributes
> {
  @Column({ type: DataType.STRING })
  url!: string;

  @Column({ type: DataType.STRING })
  name!: string;
}
