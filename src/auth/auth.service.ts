import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SigInUserDto } from './dtos/requestsDtos/signInUser.dto';
import * as bcrypt from 'bcrypt';
import { ApiResponse } from './dtos/requestsDtos/ApiResponse.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async sigIn(sigInData: SigInUserDto): Promise<ApiResponse> {
    try {
      const user = await this.userService.finUser(sigInData.email);
      if (!user) {
        return {
          status: 400,
          msge: `El email ${sigInData.email} no esta registrado`,
        };
      }
      const isMatch = await bcrypt.compare(sigInData.password, user.password);
      if (!isMatch) {
        return {
          status: 400,
          msge: `Contraseña ${sigInData.password} incorrecta`,
        };
      }
      // Generar JWT
      const payload = { email: user.email, sub: user.id };
      const token = this.jwtService.sign(payload);
      return {
        status: 200,
        data: { email: payload.email, id: payload.sub, token },
      };
    } catch (error) {
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }
}
