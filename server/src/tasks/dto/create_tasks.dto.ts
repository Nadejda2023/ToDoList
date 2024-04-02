import { IsNumber, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Должно быть строкой' })
  @Length(1, 16, { message: 'Не меньше 1 символа и не больше 16 символов' })
  readonly title: string;
  @Length(1, 100, { message: 'Не меньше 1 символа и не больше 100 символов' })
  readonly description: string;
  readonly priority: string;
  readonly expirationDate: Date;
  readonly createAt: string;
  lastPutDate: Date;
  readonly status: string;
  readonly userCreateTask: number;
  @IsNumber(
    {},
    {
      message:
        'Должно быть числом индификатор пользователя ответственного за назначенную задачу',
    },
  )
  readonly responsiblePerson: number;
}
