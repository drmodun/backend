import { Module } from '@nestjs/common';
import { FollowersService } from './followers.service';
import { FollowersController } from './followers.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FollowersController],
  providers: [FollowersService],
  imports: [PrismaModule],
  exports: [FollowersService],
})
export class FollowersModule {}
