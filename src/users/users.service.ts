import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';
import { isUUID } from '@nestjs/common/utils/is-uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  getAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    const conditions = isUUID(id)
      ? [{ id }]
      : [{ email: id }, { username: id }];
    return this.usersRepository.findOne({
      where: conditions,
      withDeleted: true,
    });
  }

  async create(user: User) {
    user['password'] = await bcrypt.hash(
      user['password'].toString(),
      process.env.APP_SALT,
    );
    await this.usersRepository.insert(user);
  }

  update(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  async softDelete(id: string): Promise<void> {
    await this.usersRepository.softDelete(id);
  }

  async restore(id: string): Promise<void> {
    await this.usersRepository.restore(id);
  }
}
