import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FollowersService } from './followers.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('followers')
@ApiTags('followers')
export class FollowersController {
  constructor(private readonly followersService: FollowersService) {}
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post(':userId') 
  async toggleDislike(
    @Req() req: any,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.followersService.toggleFollow(req.user.id, userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':userId')
  async checkIfFollows(
    @Req() req: any,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    return await this.followersService.checkIfFollows(req.user.id, userId);
  }
}
