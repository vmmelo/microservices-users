import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ClientsModule.register([
      {
        name: 'EMAIL_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@192.168.1.11:5672'],
          queue: 'email_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
