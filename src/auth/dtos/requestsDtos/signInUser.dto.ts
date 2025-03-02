import { IsEmail, IsNotEmpty } from 'class-validator';

export class SigInUserDto {
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly password: string;
}
