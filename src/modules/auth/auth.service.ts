import { User } from '@/core/database/models/user.model';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
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
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new Error('Password or login is wrong.');

    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) throw new Error('Password or login is wrong.');

    const payload = { email: user.email, id: user.id };

    return this.jwtService.sign(payload, { secret: 'm' });
  }
}
