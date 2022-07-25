import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    // ClientsModule.register([
    //   {
    //     name: 'GREETING_SERVICE',
    //     transport: Transport.RMQ,
    //     options: {
    //       urls: ['amqp://localhost:5672'],
    //       queue: 'email_queue',
    //       queueOptions: {
    //         durable: false,
    //       },
    //     },
    //   },
    // ]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
