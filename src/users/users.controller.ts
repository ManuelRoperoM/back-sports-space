import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dtos/requestDtos/registerUser.dto';
import { ResponseRegisterDto } from './dtos/responsesDtos/ResponseRegisterDto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('register')
  register(
    @Body() registerData: RegisterUserDto,
  ): Promise<ResponseRegisterDto> {
    return this.userService.registerNewUser(registerData);
  }
}
