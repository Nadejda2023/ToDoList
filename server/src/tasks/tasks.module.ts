import { Module, forwardRef } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Tasks } from './tasks.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [
    SequelizeModule.forFeature([Tasks, User, Role, UserRoles]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
})
export class TasksModule {}
