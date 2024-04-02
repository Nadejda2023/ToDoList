import { IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 16, { message: 'Не меньше 1 символа и не больше 16 символов' })
  readonly loginOrEmail: string;
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 16, { message: 'Не меньше 1 символа и не больше 16 символов' })
  readonly password: string;
}
