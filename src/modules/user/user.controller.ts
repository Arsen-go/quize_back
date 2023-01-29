import { User } from '@/schema/user.schema';
import { Controller, Get } from '@nestjs/common';
import { UserService } from '@Service/user/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/getUsers')
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
