import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
// import { JWT_ACCESS_TOKEN_SECRET } from '@/constants/configs';
import { JwtService } from '@nestjs/jwt';
// import { UserService } from '@/modules/user/user.service';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) // private readonly userService: UserService,
  {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = GqlExecutionContext.create(context).getContext()?.req;

    try {
      const token = req.headers.authorization?.split(' ')?.[1];
      if (!token) {
        throw 'Unauthorized';
      }

      // const decodedAccessToken = await this.jwtService.verifyAsync(token, {
      //   secret: JWT_ACCESS_TOKEN_SECRET,
      //   ignoreExpiration: true,
      // });

      // if (!decodedAccessToken) {
      //   throw 'Unauthorized';
      // }

      // const { refreshToken } = req.cookies;

      // const decodedRefreshToken = await this.jwtService.verifyAsync(
      //   refreshToken,
      //   {
      //     secret: JWT_ACCESS_TOKEN_SECRET,
      //   },
      // );

      // if (
      //   !decodedRefreshToken ||
      //   decodedAccessToken.userId !== decodedRefreshToken.userId
      // ) {
      //   throw 'Unauthorized';
      // }

      // const user = await this.userService.getUserById(
      //   decodedAccessToken.userId,
      // );
      // req.user = user;

      return true;
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException(error);
    }
  }
}
