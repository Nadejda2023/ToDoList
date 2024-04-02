import { IsString } from 'class-validator';

export class UpdateStatusDto {
  @IsString({ message: 'Должно быть строкой' })
  status: string;
}
