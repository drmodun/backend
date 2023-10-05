import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('likes')
@ApiTags('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':reviewId')
  async toggleDislike(
    @Req() req: any,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    return await this.likesService.toggleLike(req.user.id, reviewId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':reviewId')
  async checkLikeStatus(
    @Req() req: any,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    const like = await this.likesService.checkLikeStatus(req.user.id, reviewId);
    return {
      liked: like,
    };
  }
}
