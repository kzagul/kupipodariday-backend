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
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { HashingService } from '../helpers/hash-service';

// @UseGuards(JwtAuthGuard)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService, // private readonly hashingService: HashingService,
    private readonly hashingService: HashingService,
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

  // @Get('search/:query')
  @Post('find')
  async findMany(@Query('query') query: string) {
    return this.usersService.findUser(query);
  }
  // async searchUser(@Param('query') query: string) {
  //   return this.usersService.findMany(query);
  // }

  @Get('search/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.usersService.findUserByUsername(username);
  }

  @Get('/profile')
  async getProfile(@Request() req) {
    const user = await this.usersService.findOne({
      where: { id: req.user.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // Метод для редактирования своего профиля
  @Put()
  async updateProfile(@Request() req, @Body() updateData: any) {
    if (updateData.password) {
      updateData.password = await this.hashingService.hashPassword(
        updateData.password,
      );
    }

    await this.usersService.update(req.user.userId, updateData);
    return this.usersService.findOne({ where: { id: req.user.userId } });
  }
}
