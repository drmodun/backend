import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DislikesService } from './dislikes.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('dislikes')
@ApiTags('dislikes')
export class DislikesController {
  constructor(private readonly dislikesService: DislikesService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':reviewId')
  async toggleDislike(
    @Req() req: any,
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ) {
    return await this.dislikesService.toggleDislike(req.user.id, reviewId);
  }
}
