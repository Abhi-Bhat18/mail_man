import { Command, CommandRunner } from 'nest-commander';
import { RoleService } from './role.service';


@Command({ name: 'seed-roles', description: 'Seed roles into the database' })
export class SeedRolesCommand extends CommandRunner {
    
  constructor(private readonly roleService: RoleService ) {
    super();
  }

  async run(): Promise<void> {
    await this.roleService.seed();
    console.log('Roles seeding completed');
  }
}