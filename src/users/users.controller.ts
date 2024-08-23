import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { HashingService } from '../helpers/hash-service';

@Controller('users')
// @UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(
    private readonly usersService: UsersService, // private readonly hashingService: HashingService,
  ) {}

  @Get('/')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/me')
  getMe() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Patch('/me')
  updateMe() {
    return this.usersService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('search/:query')
  async searchUser(@Param('query') query: string) {
    const users = await this.usersService.findMany(query);
    if (!users || users.length === 0) {
      throw new NotFoundException('No users found with that query');
    }
    return users;
  }
}
