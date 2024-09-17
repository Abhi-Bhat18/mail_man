import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('role')
// @UseGuards(AuthGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getAllRoles() {
    return await this.roleService.getAllRoles();
  }

  @Post()
  async createRoles() {
    console.log('Hitting the route');

    return await this.roleService.seed();
  }
}
