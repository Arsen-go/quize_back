import { User } from '@/core/database/models/user.model';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  create(user: CreateUserInput): Number {
    // this.users.push(user);
    return 1;
  }

  update(id: number, user: CreateUserInput): User {
    const index = this.users.findIndex((user) => user.id === id);
    // this.users[index] = { id, ...user };
    return this.users[index];
  }

  delete(id: number): User {
    const index = this.users.findIndex((user) => user.id === id);
    const user = this.users[index];
    this.users.splice(index, 1);
    return user;
  }
}
