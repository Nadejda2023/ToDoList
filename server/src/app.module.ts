import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';
import { TasksModule } from './tasks/tasks.module';
import { Tasks } from './tasks/tasks.model';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/roles.model';
import { UserRoles } from './roles/user-roles.model';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_H,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_U,
      password: process.env.POSTGRES_PAS,
      database: process.env.POSTGRES_DB,
      models: [User, Tasks, Role, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    TasksModule,
    RolesModule,
    AuthModule,
  ],
})
export class AppModule {}
