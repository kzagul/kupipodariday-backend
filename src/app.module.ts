import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GiftsModule } from './gifts/gifts.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { UsersModule } from './users/users.module';
import { CollectionsModule } from './collections/collections.module';

@Module({
  imports: [GiftsModule, WishlistsModule, UsersModule, CollectionsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
