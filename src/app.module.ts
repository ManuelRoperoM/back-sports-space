import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationsModule } from './reservations/reservations.module';
import { SportsFacilitesModule } from './sports_facilites/sports_facilites.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Reservation } from './reservations/entities/reservation.entity';
import { SportsFacilities } from './sports_facilites/entities/sports_facilites.entity';
import { Rol } from './users/entities/rol.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'secret.env' });
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'secret.env',
      isGlobal: true,
    }),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'sports_space',
      entities: [User, Reservation, SportsFacilities, Rol],
      synchronize: false, //Evitar cambiar la database con las class entities
    }),
    ReservationsModule,
    SportsFacilitesModule,
    UsersModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      defaults: {
        from: '"Soporte Sports Space" <mnlrpr@gmail.com>',
      },
    }),
    MailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
