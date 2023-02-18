import { GqlExecutionContext } from '@nestjs/graphql';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
// import { UserService } from '@/modules/user/user.service';
// import { JWT_ACCESS_TOKEN_SECRET } from '@/constants/configs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService, // private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = GqlExecutionContext.create(context).getContext()?.req;

    const token = req.headers.authorization?.split(' ')?.[1];
    if (!token) {
      throw new UnauthorizedException('Unauthorized');
    }

    // const decoded = await this.jwtService.verifyAsync(token, {
    //   secret: JWT_ACCESS_TOKEN_SECRET,
    // });

    // if (!decoded) {
    //   throw new UnauthorizedException('Unauthorized');
    // }

    // req.user = await this.userService.getUserById(decoded.userId);

    return true;
  }
}
