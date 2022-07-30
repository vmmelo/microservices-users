import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { EmailContent } from './entities/emailContent.entity';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

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
      console.time('execution-time');
      const channel = context.getChannelRef();
      const originalMsg = context.getMessage();
      if (await this.appService.sendGreetingEmail(data?.email)) {
        channel.ack(originalMsg);
      }
    } catch (e) {
      console.error(e);
    } finally {
      console.timeEnd('execution-time');
    }
  }
}
