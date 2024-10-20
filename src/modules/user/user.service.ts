import { CreateUserInput } from './inputs/create-user.input';
import { Injectable } from '@nestjs/common';
import { User } from '@/database/models/user.model';

@Injectable()
export class UserService {
  async getUser({ id }: { id: number }): Promise<User> {
    return User.findByPk(id);
  }

  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  async create({ input }: { input: CreateUserInput }): Promise<User> {
    return User.create(input);
  }

  async update(id: number, input: CreateUserInput): Promise<User> {
    const user: User = await User.findByPk(id);

    return user.update({});
  }

  async delete(id: number): Promise<void> {
    const user: User = await User.findByPk(id);

    await user.destroy();
  }
}
