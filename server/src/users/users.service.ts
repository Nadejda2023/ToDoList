import { RolesService } from './../roles/roles.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './users.model';
import { CreateUserDto } from './dto/create_user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AddRoleDto } from './dto/add-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const candidate = await this.userRepository.findOne({
      where: { loginOrEmail: dto.loginOrEmail },
    });
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('ADMIN'); // default User
    await user.$set('roles', [role.id]); // перезаписывает роль и сразу обновляет бд
    user.roles = [role];
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByLogin(loginOrEmail: string) {
    const user = await this.userRepository.findOne({
      where: { loginOrEmail },
      include: { all: true },
    });
    return user;
  }
  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (role && user) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException(
      'Пользователь или роль не найдены',
      HttpStatus.NOT_FOUND,
    );
  }
}
