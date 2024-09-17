import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from 'src/modules/database/database.service';

@Controller('users')
export class UserController {
  constructor(private readonly db: DatabaseService) {}

  @Get()
  getUsers() {
    return 'Hitting the user route';
  }
}
