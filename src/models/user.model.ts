import { LanguagesEnum } from '@/constants/enums';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field()
  isPartner: boolean;

  @Field()
  userAPIKey: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  initials: string;

  @Field()
  profilePic: string;

  @Field()
  isAdmin: boolean;

  @Field()
  userID: number;

  @Field()
  primaryUserAPIKey: string;

  @Field()
  orgID: number;

  @Field()
  defaultProductUponLogin: string;

  @Field()
  emailAddress: string;

  // This is a custom field that is not needed in the frontend
  apiToken: string;

  @Field(() => LanguagesEnum)
  orgLanguage: LanguagesEnum;

  @Field(() => LanguagesEnum)
  accountLanguage: LanguagesEnum;
}
