import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dtos/requestDtos/registerUser.dto';
import { ResponseRegisterDto } from './dtos/responsesDtos/ResponseRegisterDto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Rol } from './entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Rol)
    private rolRepository: Repository<Rol>,
    private readonly mailService: MailService,
  ) {}
  async registerNewUser(
    registerData: RegisterUserDto,
  ): Promise<ResponseRegisterDto> {
    try {
      const existingUser = await this.userRepository.findOneBy({
        email: registerData.email,
      });

      if (existingUser) {
        return {
          status: 400,
          msge: `El email: ${registerData.email} ya está en uso`,
        };
      }

      const hashPassword = await bcrypt.hash(registerData.password, 10);
      const rol = await this.rolRepository.findOneBy({ rol: 'USUARIO' });
      const newUser = this.userRepository.create({
        name: registerData.name,
        password: hashPassword,
        email: registerData.email,
        rol: rol,
      });
      await this.userRepository.save(newUser);
      await this.mailService.sendConfirmRegistration(registerData.email);
      return { status: 200, msge: registerData.email + 'Creado exitosamente' };
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      return {
        status: 500,
        msge: error instanceof Error ? error.message : String(error),
      };
    }
  }

  async finUser(userEmail: string): Promise<User> {
    return this.userRepository.findOneBy({ email: userEmail });
  }
}
