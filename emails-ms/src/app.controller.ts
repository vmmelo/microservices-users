import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  @MessagePattern({ cmd: 'greeting' })
  getGreetingMessage(name: string): string {
    console.log(name);
    return `Hello ${name}`;
  }

  @MessagePattern({ cmd: 'greeting-async' })
  async getGreetingMessageAysnc(name: string): Promise<string> {
    return `Hello ${name} Async`;
  }

  @EventPattern('user-registered')
  async handleUserRegistered(data: Record<string, unknown>) {
    console.log(data);
    console.log(`EMAIL ENVIADO PARA ${data.email}`);
  }
}
