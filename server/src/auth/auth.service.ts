import { CreateUserDto } from 'src/users/dto/create_user.dto';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByLogin(
      userDto.loginOrEmail,
    );
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким логином уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = {
      email: user.loginOrEmail,
      id: user.id,
      roles: user.roles,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.getUserByLogin(userDto.loginOrEmail);
    if (!user) {
      throw new UnauthorizedException({
        message: 'Проверьте логин, пользователь не найден!',
      });
    }
    const passwordCheck = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordCheck) {
      return user;
    }
    throw new UnauthorizedException({ message: 'Неверный логин или пароль' });
  }
}
