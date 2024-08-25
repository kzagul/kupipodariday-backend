import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { HashingService } from '../helpers/hash-service';
import { JwtConfigFactory } from '@config/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtConfigFactory,
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    // HashingService,
    JwtConfigFactory,
  ],
  exports: [
    AuthService,
    // HashingService
  ],
})
export class AuthModule {}
