import { Module } from '@nestjs/common';
import { DislikesService } from './dislikes.service';
import { DislikesController } from './dislikes.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [DislikesController],
  providers: [DislikesService],
  imports: [PrismaModule],
  exports: [DislikesService],
})
export class DislikesModule {}
