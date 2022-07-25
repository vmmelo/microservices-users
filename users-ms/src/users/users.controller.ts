import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async listAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    return await this.usersService.findOne(params?.id);
  }

  @Post()
  async create(@Body() user): Promise<void> {
    try {
      return this.usersService.create(user);
    } catch (e) {
      console.error(e.getMessage());
    }
  }

  @Put(':id')
  async update(@Param() params, @Body() user): Promise<User> {
    return await this.usersService.update({ ...user, id: params?.id });
  }

  @Delete(':id')
  delete(@Param() params) {
    return this.usersService.softDelete(params?.id);
  }

  @Patch('restore/:id')
  restore(@Param() params) {
    return this.usersService.restore(params?.id);
  }
}
