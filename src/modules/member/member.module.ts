import { MemberResolver } from './member.resolver';
import { MemberService } from './member.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MemberResolver, MemberService],
  exports: [MemberService],
})
export class MemberModule {}
