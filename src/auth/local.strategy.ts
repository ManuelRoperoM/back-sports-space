import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { ApiResponse } from './dtos/requestsDtos/ApiResponse.interface';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  async validate(email: string, password: string): Promise<ApiResponse> {
    const auth = await this.authService.sigIn({
      email: email,
      password: password,
    });
    console.log('Resultado:', auth);
    if (auth.status != 200) {
      throw new UnauthorizedException();
    }
    return { status: auth.status, data: auth.data };
  }
}
