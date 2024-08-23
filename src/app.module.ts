import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from '@users/users.controller';
import { WishesController } from '@wishes/wishes.controller';
import { WishlistsController } from '@wishlists/wishlists.controller';
import { OffersController } from '@offers/offers.controller';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config/configuration';
import { DatabaseConfigFactory } from './config/database';

import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigFactory,
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  controllers: [
    AppController,
    UsersController,
    WishesController,
    WishlistsController,
    OffersController,
  ],
  providers: [],
})
export class AppModule {}
