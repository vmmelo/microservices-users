import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { EmailContent } from './entities/emailContent.entity';

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
  async handleUserRegistered(
    @Payload() data: EmailContent,
    @Ctx() context: RmqContext,
  ) {
    try {
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      console.time('execution-time');
      setTimeout(() => {
        console.log(`EMAIL ENVIADO PARA ${data?.email}`);
        channel.ack(originalMsg);
      }, Math.floor(Math.random() * 5000));
      console.timeEnd('execution-time');
    } catch (e) {
      console.error(e);
    }
  }
}
