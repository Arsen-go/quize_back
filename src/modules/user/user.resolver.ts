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

  @Query(() => User)
  async user(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('input') input: CreateUserInput,
  ) {
    return this.userService.update(id, input);
  }

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number) {
    return this.userService.delete(id);
  }
}
