import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getAllUsers();
  }
}
