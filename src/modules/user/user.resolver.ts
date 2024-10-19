import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '@/core/database/models/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './inputs/create-user.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/decorators/current-user.decorator';

@UseGuards(AuthGuard)
@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User)
  async getMe(@CurrentUser() user: User): Promise<User> {
    return user;
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.userService.create({ input });
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async getUser(@Args('id') id: number) {
    return this.userService.getUser({ id });
  }

  @Query(() => [User])
  async users() {
    return this.userService.findAll();
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
