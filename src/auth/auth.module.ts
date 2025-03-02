import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    PassportModule,
    JwtModule.register({
      secret: 'process.env.SECRET_JWT',
      signOptions: {
        expiresIn: '1h',
        issuer: 'sportspace',
        audience: 'sportspace',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
