import {
  Controller,
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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly hashingService: HashingService,
  ) {}

  @Post('signup')
  async signup(@Body() createUserDto: any) {
    const hashedPassword = await this.hashingService.hashPassword(
      createUserDto.password,
    );
    return this.usersService.create({
      ...createUserDto,
      password: hashedPassword,
    });
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signin(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
