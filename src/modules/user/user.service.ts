import { User } from '@/core/database/models/user.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class UserService {
  async findOne(id: number): Promise<User> {
    return User.findByPk(id);
  }

  async findAll(): Promise<User[]> {
    return User.findAll();
  }

  async create(input: CreateUserInput): Promise<User> {
    return User.create(input);
  }

  async update(id: number, input: CreateUserInput): Promise<User> {
    const user = await User.findByPk(id);
    return user.update({});
  }

  async delete(id: number): Promise<void> {
    const user = await User.findByPk(id);
    await user.destroy();
  }
}
