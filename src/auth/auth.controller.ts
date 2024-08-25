import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { HashingService } from '../helpers/hash-service';
import { LocalAuthGuard } from './guards/local.guard';
import { AuthGuard } from '@nestjs/passport';
import { AuthDecorator } from '@helpers/auth.decorator';
import { CreateUserDto } from '@users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.signup(createUserDto);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(@AuthDecorator() user) {
    return this.authService.login(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
