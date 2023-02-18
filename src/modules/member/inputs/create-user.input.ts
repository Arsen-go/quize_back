import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field(() => String)
  emailAddress: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName: string;
}
