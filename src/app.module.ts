import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FavouritesModule } from './favourites/favourites.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LikesModule } from './likes/likes.module';
import { DislikesModule } from './dislikes/dislikes.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    AuthModule,
    FavouritesModule,
    ReviewsModule,
    LikesModule,
    DislikesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
