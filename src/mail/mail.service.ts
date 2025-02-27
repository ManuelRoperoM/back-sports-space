import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendConfirmRegistration(email: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: '🎉 ¡Registro exitoso en Sports Space! 🎉',
      text: '¡Bienvenido a Sports Space! Ya puedes usar nuestros servicios.',
      html: `
          <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
            <h1 style="color: #4CAF50;">¡Bienvenido a Sports Space! 🏆</h1>
            <p style="font-size: 18px;">Gracias por registrarte en nuestra plataforma. 
            Ahora puedes disfrutar de todas nuestras funcionalidades y servicios.</p>
            <img src="cid:logo" alt="Sports Space Logo" width="200" style="margin: 20px 0;"/>
            <p>Si tienes alguna duda, contáctanos en cualquier momento.</p>
            <p style="font-weight: bold;">¡Disfruta tu experiencia! 🚀</p>
          </div>
        `,
      attachments: [
        {
          filename: 'logo.png',
          path: 'src/assets/logo.png',
          cid: 'logo',
        },
      ],
    });
  }
}
