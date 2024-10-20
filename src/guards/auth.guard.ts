import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/database/models/user.model';

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

    const decoded = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });

    if (!decoded) {
      throw new UnauthorizedException('Unauthorized');
    }

    const user = await User.findByPk(decoded.id);

    req.currentUser = user;

    return true;
  }
}
