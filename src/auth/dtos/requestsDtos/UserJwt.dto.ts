import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class UserJwtDto {
  @IsEmail()
  readonly email: string;
  @IsNumber()
  readonly id: number;
  @IsNotEmpty()
  readonly token: string;
}
