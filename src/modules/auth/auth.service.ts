import { CookieOptions, Response } from 'express';

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/database/models/user.model';

@Injectable()
export class AuthService {
  public tokenCookieOptions: CookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.SELF_URL,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    // TODO: Replace this with your own user validation logic
    if (username === 'user' && password === 'password') {
      return { id: 1, username: 'user' };
    }

    return null;
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<string> {
    const user: User = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new Error('Password or login is wrong.');

    const isPasswordCorrect: boolean = await user.checkPassword(password);

    if (!isPasswordCorrect) throw new Error('Password or login is wrong.');

    const payload = { email, id: user.id };

    return this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.EXPIRE_TIME,
    });
  }

  async refreshToken(res: Response, refreshToken: string): Promise<string> {
    // const tokens = await this.ideaScaleService.refreshToken(refreshToken);

    res.cookie('refreshToken', 'tokens.refresh_token', this.tokenCookieOptions);

    return 'tokens.access_token';
  }
}
