import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { RefreshToken } from '@/decorators/refresh-token.decorator';
import { RefreshTokenGuard } from '@/guards/refresh-token.guard';
import { UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { AccessToken } from '@/decorators/access-token.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => String)
  async login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context('res') res: Response,
  ): Promise<string> {
    return this.authService.login({ email, password, res });
  }

  @UseGuards(RefreshTokenGuard)
  @Query(() => String)
  async refreshToken(
    @Context('res') res: Response,
    @RefreshToken() refreshToken: string,
    @AccessToken() accessToken: string,
  ) {
    return this.authService.refreshToken({ res, refreshToken, accessToken });
  }
}
