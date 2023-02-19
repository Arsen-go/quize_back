import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '@/core/database/models/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './inputs/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => String)
  sayHello(): string {
    console.log('Sss');
    return 'Hello World!';
  }

  @Query((returns) => [User])
  users(): User[] {
    return this.userService.findAll();
  }

  @Query((returns) => User)
  user(@Args('id') id: number): User {
    return this.userService.findOne(id);
  }

  @Mutation((returns) => User)
  createUser(@Args('user') user: CreateUserInput): Number {
    return this.userService.create(user);
  }

  @Mutation((returns) => User)
  updateUser(
    @Args('id') id: number,
    @Args('user') user: CreateUserInput,
  ): User {
    return this.userService.update(id, user);
  }

  @Mutation((returns) => User)
  deleteUser(@Args('id') id: number): User {
    return this.userService.delete(id);
  }
}
