import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = GqlExecutionContext.create(context).getContext()?.req;

    const accessToken = req.headers.authorization?.split(' ')?.[1];
    if (!accessToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    let { refreshToken } = req.cookies;

    if (!refreshToken) {
      refreshToken = req.headers['refresh-token'];
    }

    if (!refreshToken) {
      throw new UnauthorizedException('Unauthorized');
    }

    req.refreshToken = refreshToken;

    return true;
  }
}
