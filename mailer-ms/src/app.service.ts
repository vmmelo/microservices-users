import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  getHello(): string {
    return 'Hello World!!';
  }

  async sendGreetingEmail(address: string): Promise<boolean> {
    if (this.configService.get<string>('NODE_ENV') !== 'production') {
      return true;
    }
    let result = false;
    await this.mailerService
      .sendMail({
        to: address,
        from: 'noreply@nestjs.com', // sender address
        subject: 'Welcome to the users microservice ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then(() => {
        console.log(`Email enviado para ${address}`);
        result = true;
      })
      .catch((e) => {
        console.error(e);
        result = false;
      });
    return result;
  }
}
