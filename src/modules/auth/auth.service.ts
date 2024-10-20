import { BadRequestException, Injectable } from '@nestjs/common';
import { CookieOptions, Response } from 'express';

import { JwtService } from '@nestjs/jwt';
import { User } from '@/database/models/user.model';

@Injectable()
export class AuthService {
  public tokenCookieOptions: CookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    domain: 'localhost',
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
    res,
  }: {
    email: string;
    password: string;
    res: Response;
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
    const { accessToken, refreshToken } = this.generateTokens(payload);

    // Set refresh token as an HTTP-only cookie
    res.cookie('refreshToken', refreshToken, this.tokenCookieOptions);

    return accessToken;
  }

  async refreshToken({
    res,
    refreshToken,
    accessToken,
  }: {
    res: Response;
    refreshToken: string;
    accessToken: string;
  }): Promise<string> {
    const refreshPayload = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_SECRET,
      ignoreExpiration: true,
    });

    const user: User = await User.findOne({
      where: { id: refreshPayload.id },
    });

    if (!user) throw new Error('Invalid user.');

    const accessTokenPayload = this.jwtService.verify(accessToken, {
      secret: process.env.JWT_SECRET,
      ignoreExpiration: true,
    });

    if (accessTokenPayload.id !== refreshPayload.id) {
      throw new BadRequestException();
    }

    const newPayload = { email: user.email, id: user.id };

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      this.generateTokens(newPayload);

    res.cookie('refreshToken', newRefreshToken, this.tokenCookieOptions);

    return newAccessToken;
  }

  generateTokens(payload: any): { accessToken: string; refreshToken: string } {
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.TOKEN_EXPIRE_TIME,
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE_TIME,
    });

    return { accessToken, refreshToken };
  }
}
