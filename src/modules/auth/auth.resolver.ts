import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RefreshToken } from '@/decorators/refresh-token.decorator';
import { RefreshTokenGuard } from '@/guards/refresh-token.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<string> {
    return this.authService.login({ email, password });
  }

  @UseGuards(RefreshTokenGuard)
  @Query(() => String)
  async refreshToken(
    @Context('res') res: Response,
    @RefreshToken() refreshToken: string,
  ) {
    return this.authService.refreshToken(res, refreshToken);
  }
}
