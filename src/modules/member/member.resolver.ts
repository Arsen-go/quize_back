// import { AuthGuard } from "@/guards/auth.guard";
// import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from '@nestjs/graphql';
import { MemberService } from './member.service';
import { User } from '@/models';

// @UseGuards(AuthGuard)
@Resolver(() => User)
export class MemberResolver {
  constructor(private memberService: MemberService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
