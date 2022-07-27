import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '300s' },
    }),
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
  providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
